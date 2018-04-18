# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

from nicolock.core.utils import get_postal_code_coordinates


class PostalCode(models.Model):
    postal_code = models.CharField(_('postal code'), max_length=12)
    lat = models.DecimalField(
        _('latitude'), max_digits=9, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(
        _('longitude'), max_digits=9, decimal_places=6, blank=True, null=True)

    def __str__(self):
        return self.postal_code


@receiver(post_save, sender=PostalCode, dispatch_uid="postal_code_created")
def postal_code_created(sender, instance, created, **kwargs):
    if created:
        coords = get_postal_code_coordinates(instance.postal_code)
        if coords:
            instance.lat = coords[0]
            instance.lng = coords[1]
            instance.save()


class SalesRep(models.Model):
    name = models.CharField(_('name'), max_length=255)
    city = models.CharField(_('city'), max_length=255)
    state = models.CharField(_('state'), max_length=55)
    phone = models.CharField(_('phone'), max_length=16)
    email = models.EmailField(_('email address'))
    original = models.ImageField(_('image'), upload_to='salesreps_images')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               format='JPEG',
                               options={'quality': 80})
    postal_codes = models.ManyToManyField(PostalCode, related_name='sales_reps')

    postal_code = ""

    def __str__(self):
        return self.name
