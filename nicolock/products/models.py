# -*- coding: utf-8 -*-
from django.conf import settings
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField
from froala_editor.fields import FroalaField
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFit, ResizeToFill
from multiselectfield import MultiSelectField


class Category(models.Model):
    name = models.CharField(_('name'), max_length=55)
    description = models.TextField(_('description'), blank=True)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    slug = AutoSlugField(unique=True, populate_from='name')
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        url_kwargs = {
            'category_slug': self.slug
        }
        return reverse('products:category', kwargs=url_kwargs)

    @classmethod
    def get_urls(clss):
        categories = clss.objects.all().order_by('slug')
        return [category.get_absolute_url() for category in categories]


class Product(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    extra_description = FroalaField(_('extra description'), blank=True)
    USES = [
        ('patio', _('Patio')),
        ('walkway', _('Walkway')),
        ('driveway', _('Driveway')),
        ('pool', _('Pool')),
    ]
    uses = MultiSelectField(_('uses'), choices=USES, max_length=255,
                            blank=True)
    like_count = models.PositiveIntegerField(_('like count'), default=0)
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    category = models.ForeignKey(Category, related_name='products')
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    slug = AutoSlugField(
        unique=True, populate_from='name', editable=True, blank=True)
    featured = models.BooleanField(default=False)
    spec_chart = models.ImageField(
        _('spec chart'), upload_to='spec_charts', blank=True, null=True)
    spec_chart_thumbnail = ImageSpecField(
        source='spec_chart', processors=[ResizeToFit(600, 600)], format='JPEG',
        options={'quality': 80})
    related_products = models.ManyToManyField(
        'products.Product', blank=True)
    related_videos = models.ManyToManyField(
        'videos.Video', blank=True)

    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        url_kwargs = {
            'category_slug': self.category.slug,
            'product_slug': self.slug
        }
        return reverse('products:product-detail', kwargs=url_kwargs)

    @staticmethod
    def get_urls():
        products = Product.objects.all().order_by('category__slug', 'slug')
        return [product.get_absolute_url() for product in products] + [reverse('products:technical-specs')]

    def get_embed_url(self):
        return reverse('products:product-embed', kwargs={'pk': self.id})

    def get_embed_code(self):
        url = self.get_embed_url()
        full_url = '{0}{1}'.format(settings.BASE_URL, url)
        return '<iframe src="{0}"></iframe>'.format(full_url)

    @cached_property
    def first_image(self):
        return self.images.all().first()


class Accessory(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    original = models.ImageField(_('original'), upload_to='product_accessories')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               options={'quality': 80})
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='accessories')

    class Meta:
        verbose_name = _('accessory')
        verbose_name_plural = _('accessories')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name


class Countertop(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    original = models.ImageField(_('image'), upload_to='product_countertops')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               options={'quality': 80})
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='countertops')

    class Meta:
        verbose_name = _('countertop')
        verbose_name_plural = _('countertops')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name


class Image(models.Model):
    name = models.CharField(_('name'), max_length=255)
    alt = models.CharField(_('alt'), max_length=255, blank=True)
    description = models.TextField(_('description'), blank=True)
    original = models.ImageField(_('original'), upload_to='product_images')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               format='JPEG',
                               options={'quality': 80})
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='images')

    class Meta:
        verbose_name = _('image')
        verbose_name_plural = _('images')
        ordering = ['order', 'modified']

    def get_absolute_url(self):
        return "{0}?image={1}".format(self.product.get_absolute_url(), self.id)

    def __str__(self):
        return self.name


class Spec(models.Model):
    label = models.CharField(_('label'), max_length=255)
    icon = ProcessedImageField(upload_to='product_specs',
                               processors=[ResizeToFit(200, 200)],
                               null=True)
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='specs')

    class Meta:
        verbose_name = _('spec')
        verbose_name_plural = _('specs')
        ordering = ['order', 'modified']

    def get_absolute_url(self):
        return self.file.url

    def __str__(self):
        return self.label


class Pattern(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    original = models.ImageField(_('original'), upload_to='product_patterns')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               options={'quality': 80})
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='patterns')

    class Meta:
        verbose_name = _('pattern')
        verbose_name_plural = _('patterns')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name


class ColorCategory(models.Model):
    name = models.CharField(_('name'), max_length=255)
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))

    class Meta:
        verbose_name_plural = _('color categories')
        ordering = ['order']

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    original = models.ImageField(_('original'), upload_to='product_colors')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               format='JPEG',
                               options={'quality': 80})
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    COLOR_TYPES = [
        ('premium', _('Premium')),
        ('deluxe', _('Deluxe'))
    ]
    color_type = models.CharField(_('color type'), blank=True,
                                  choices=COLOR_TYPES, max_length=10)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='colors', blank=True, null=True)
    category = models.ForeignKey(
        ColorCategory, related_name='colors', blank=True, null=True)

    class Meta:
        verbose_name = _('color')
        verbose_name_plural = _('colors')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name


class File(models.Model):
    name = models.CharField(_('name'), max_length=255)
    file = models.FileField(_('file'))
    order = models.PositiveIntegerField(
        _('order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, related_name='files')

    class Meta:
        verbose_name = _('file')
        verbose_name_plural = _('files')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name
