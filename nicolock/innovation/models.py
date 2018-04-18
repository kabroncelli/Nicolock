# -*- coding: utf-8 -*-
from django.db import models
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill


class Innovation(models.Model):
    name = models.CharField(_('name'), max_length=255)
    image = models.ImageField(_('image'), upload_to='innovation_images')
    large_thumbnail = ImageSpecField(source='image',
                                     processors=[ResizeToFill(600, 600)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='image',
                               processors=[ResizeToFill(300, 300)],
                               format='JPEG',
                               options={'quality': 80})
    description = models.TextField(_('description'), blank=True)
    featured = models.BooleanField(_('featured'), default=False)
    slug = AutoSlugField(unique=True, populate_from='name')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name',]

    def get_absolute_url(self):
        url_kwargs = {
            'innovation_slug': self.slug
        }
        return reverse('innovation:detail', kwargs=url_kwargs)