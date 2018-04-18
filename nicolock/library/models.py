# -*- coding: utf-8 -*-
from django.db import models
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill


class Image(models.Model):
    name = models.CharField(_('name'), max_length=255)
    original = models.ImageField(_('original'), upload_to='library_images')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(600, 600)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(300, 300)],
                               format='JPEG',
                               options={'quality': 80})
    description = models.TextField(_('description'), blank=True)
    slug = AutoSlugField(populate_from='name', unique=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        url_kwargs = {
            'slug': self.slug
        }
        return reverse('library:detail', kwargs=url_kwargs)

    @staticmethod
    def get_urls():
        images = Image.objects.all().order_by('slug')
        return [image.get_absolute_url() for image in images]
