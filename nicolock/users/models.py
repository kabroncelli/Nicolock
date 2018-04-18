# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.core.urlresolvers import reverse
from django.db import models
from django.utils import six, timezone
from django.utils.encoding import python_2_unicode_compatible
from django.db.models.signals import pre_save
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill
from multiselectfield import MultiSelectField
from rest_framework.authtoken.models import Token

from nicolock.core.utils import slugify_lower, get_address_coordinates


class ContractorList(models.Model):
    homeowner = models.OneToOneField('users.User', related_name='contractor_list')
    contractors = models.ManyToManyField(
        'users.User', related_name='contractor_lists', blank=True)

    def __str__(self):
        return self.homeowner.name


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


@python_2_unicode_compatible
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(_('name'), max_length=100)
    email = models.EmailField(_('email address'), unique=True)
    postal_code = models.CharField(_('postal code'), max_length=12)

    USER_TYPES = [
        ('homeowner', _('Homeowner')),
        ('contractor', _('Contractor')),
    ]

    user_type = models.CharField(_('user type'), max_length=12,
                                 choices=USER_TYPES)

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    slug = AutoSlugField(unique=True, populate_from='name')

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'name',
        'user_type',
        'postal_code'
    ]

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def clean(self):
        super(User, self).clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_absolute_url(self):
        return reverse('galleries:gallery-list',
                       kwargs={'user_slug': self.slug})

    def get_token(self):
        try:
            return self.auth_token.key
        except Token.DoesNotExist:
            return Token.objects.create(user=self).key

    def __str__(self):
        return self.email


@python_2_unicode_compatible
class CompanyProfile(models.Model):
    CERTIFICATIONS = [
        ('np', _('NP')),
        ('nw', _('NW')),
    ]
    user = models.OneToOneField(User, blank=True, null=True)
    name = models.CharField(_('company name'), max_length=255, blank=True)
    address_line_one = models.TextField(
        _('address line one'), blank=True, null=True)
    address_line_two = models.TextField(
        _('address line two'), blank=True, null=True)
    city = models.CharField(
        _('city'), max_length=255, blank=True, null=True)
    state = models.CharField(
        _('state'), max_length=55, blank=True, null=True)
    postal_code = models.CharField(
        _('postal code'), max_length=12, blank=True, null=True)
    longitude = models.FloatField(_('longitude'), blank=True, null=True)
    latitude = models.FloatField(_('latitude'), blank=True, null=True)
    website = models.URLField(_('company website'), blank=True)
    phone = models.CharField(_('company phone number'), max_length=16,
                             blank=True)
    email = models.EmailField(_('company email'), blank=True)
    contact_name = models.CharField(_('contact name'),
                                    max_length=255, blank=True)
    contact_email = models.EmailField(_('contact email'), blank=True)
    contact_phone = models.CharField(_('contact phone number'), max_length=16,
                                     blank=True)
    area_covered = models.CharField(_('area_covered'),
                                    max_length=255, blank=True)
    specialties = models.CharField(_('specialties'), max_length=255,
                                   blank=True)
    description = models.TextField(_('description'), blank=True)
    image = models.ImageField(
        _('image'), null=True, blank=True, upload_to='company_profile_images')
    large_thumbnail = ImageSpecField(source='image',
                                     processors=[ResizeToFill(600, 600)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='image',
                               processors=[ResizeToFill(300, 300)],
                               format='JPEG',
                               options={'quality': 80})
    certifications = MultiSelectField(
        _('certifications'), choices=CERTIFICATIONS, max_length=55, blank=True)
    slug = AutoSlugField(unique=True, blank=True, null=True, populate_from='name')

    class Meta:
        verbose_name = 'contractor'
        verbose_name_plural = 'contractors'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        if self.user:
            return self.user.get_absolute_url()
        return None

    def get_address(self):
        return '{}{}{}{}{}'.format(
            self.address_line_one,
            ',{}'.format(self.address_line_two) if self.address_line_two else '',
            ',{}'.format(self.city) if self.city else '',
            ',{}'.format(self.state) if self.state else '',
            ',{}'.format(self.postal_code) if self.postal_code else '',
        )


def geocode_company_profile_address(sender, instance, **kwargs):
    if instance.address_line_one and not instance.latitude and not instance.longitude:
        geocode_result = get_address_coordinates(instance.get_address())
        if geocode_result:
            instance.latitude = geocode_result[0]
            instance.longitude = geocode_result[1]

pre_save.connect(geocode_company_profile_address,
                 sender=CompanyProfile,
                 dispatch_uid='geocode_company_profile_address')
