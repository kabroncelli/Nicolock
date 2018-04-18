# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

from nicolock.core.utils import get_address_coordinates


class Dealer(models.Model):
    name = models.CharField(_('name'), max_length=255)
    address = models.TextField(_('address'))
    city = models.CharField(_('city'), max_length=255)
    state = models.CharField(_('state'), max_length=55)
    postal_code = models.CharField(_('postal code'), max_length=12)
    phone = models.CharField(_('phone'), max_length=16)
    website = models.URLField(_('website'), blank=True)
    lat = models.DecimalField(
        _('latitude'), max_digits=9, decimal_places=6, blank=True, null=True)
    lng = models.DecimalField(
        _('longitude'), max_digits=9, decimal_places=6, blank=True, null=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=Dealer, dispatch_uid="dealer_created")
def dealer_created(sender, instance, created, **kwargs):
    if created and not instance.lat and not instance.lng:
        address = "{0} {1}, {2} {3}".format(
            instance.address, instance.city, instance.state, instance.postal_code)
        coords = get_address_coordinates(address)
        if coords:
            instance.lat = coords[0]
            instance.lng = coords[1]
            instance.save()
