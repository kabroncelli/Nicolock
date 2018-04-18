# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

import json

from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField
from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill


class Gallery(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    user = models.ForeignKey('users.User', related_name='galleries')
    products_used = models.TextField(blank=True, null=True)
    patterns_used = models.TextField(blank=True, null=True)
    project = models.ForeignKey(
        'galleries.Project', related_name='galleries', blank=True, null=True)
    slug = AutoSlugField(unique=True, populate_from='name')

    class Meta:
        verbose_name_plural = 'galleries'
        ordering = ['name',]

    def __str__(self):
        return '{0}: {1}'.format(self.user.name, self.name)

    def get_absolute_url(self):
        return reverse('galleries:gallery-detail', kwargs={'slug': self.slug})

    def get_gallery_json(self):
        from nicolock.galleries.serializers import GallerySerializer
        return json.dumps(GallerySerializer(self).data)

    def get_project_name(self):
        if hasattr(self.project, 'name'):
            return self.project.name
        return None

    def get_gallery_type(self):
        return self.user.user_type

    @staticmethod
    def get_urls():
        galleries = Gallery.objects.all().order_by('slug')
        return [gallery.get_absolute_url() for gallery in galleries]


class Item(models.Model):
    name = models.CharField(_('name'), max_length=255)
    color = models.CharField(_('color'), blank=True, max_length=255)
    notes = models.TextField(_('notes'), blank=True)
    original = models.ImageField(_('original'), upload_to='gallery_item_images')
    large_thumbnail = ImageSpecField(source='original',
                                     processors=[ResizeToFill(800, 800)],
                                     format='JPEG',
                                     options={'quality': 80})
    thumbnail = ImageSpecField(source='original',
                               processors=[ResizeToFill(205, 315)],
                               format='JPEG',
                               options={'quality': 80})
    gallery = models.ForeignKey(Gallery, related_name='items')
    slug = AutoSlugField(unique=True, populate_from='name')

    def __str__(self):
        return '{0}: {1}'.format(self.gallery.name, self.name)

    def get_absolute_url(self):
        kwargs = {
            'slug': self.slug
        }
        return reverse('galleries:item-edit', kwargs=kwargs)


class Project(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.TextField(_('description'), blank=True)
    user = models.ForeignKey('users.User', related_name='projects')
    slug = AutoSlugField(unique=True, populate_from='name')

    def __str__(self):
        return '{0}: {1}'.format(self.user.name, self.name)

    def get_absolute_url(self):
        return reverse('galleries:project-detail', kwargs={'slug': self.slug})


class InspirationalPhoto(models.Model):
    name = models.CharField(_('name'), max_length=255)
    brief_description = models.TextField(_('brief description'), blank=True)
    long_description = models.TextField(_('long description'), blank=True)
    list_image = models.ImageField(_('list image'),
                                   upload_to='inspirational_photo_images')
    list_image_thumbnail = ImageSpecField(source='list_image',
                                          processors=[ResizeToFill(800, 800)],
                                          format='JPEG',
                                          options={'quality': 80})
    detail_image = models.ImageField(_('detail image'),
                                     upload_to='inspirational_photo_images')
    detail_image_thumbnail = ImageSpecField(source='detail_image',
                                          processors=[ResizeToFill(800, 800)],
                                          format='JPEG',
                                          options={'quality': 80})
    slug = AutoSlugField(unique=True, populate_from='name')

    class Meta:
        ordering = ['name',]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('galleries:inspiration-detail', kwargs={'slug': self.slug})

    @staticmethod
    def get_urls():
        inspirational_photos = InspirationalPhoto.objects.all().order_by('slug')
        return [photo.get_absolute_url() for photo in inspirational_photos]
