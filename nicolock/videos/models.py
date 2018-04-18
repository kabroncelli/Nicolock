# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

import re

from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField


youtube_video_id_regex = re.compile('.+/(?:watch\?v=)?(?P<id>\w+)')


class Tag(models.Model):
    name = models.CharField(_('name'), max_length=55)

    def __str__(self):
        return self.name


class Video(models.Model):
    name = models.CharField(_('name'), max_length=55)
    description = models.TextField(_('description'), blank=True)
    url = models.URLField(_('url'), help_text=("Please get the share url from "
            "the share link below the video. The url should look something "
            "like this: 'https://youtu.be/AslncyG8whg'"))
    tags = models.ManyToManyField(Tag)
    slug = AutoSlugField(unique=True, populate_from='name')
    like_count = models.PositiveIntegerField(_('like count'), default=0)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['name',]

    def __str__(self):
        return self.name

    @cached_property
    def tag_text(self):
        return " ".join(
            self.tags.all().values_list('name', flat=True)
        )

    @cached_property
    def video_id(self):
        video_id = youtube_video_id_regex.match(self.url)
        if video_id:
            return video_id.group('id')

    @cached_property
    def thumbnail_url(self):
        return "https://img.youtube.com/vi/{0}/sddefault.jpg".format(
            self.video_id)

    def get_absolute_url(self):
        return reverse('videos:detail', kwargs={'slug': self.slug})

    @staticmethod
    def get_urls():
        videos = Video.objects.all().order_by('slug')
        return [video.get_absolute_url() for video in videos]
