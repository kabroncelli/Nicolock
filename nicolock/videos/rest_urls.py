# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^videos/(?P<pk>\d+)/like/?$',
        view=views.VideoLike.as_view(),
        name='video-like'
    ),
    url(
        regex=r'^videos/?$',
        view=views.VideoList.as_view(),
        name='list'
    ),
    url(
        regex=r'^tags/?$',
        view=views.TagList.as_view(),
        name='tag-list'
    ),
    url(
        regex=r'^tags/(?P<pk>\d+)/videos/?$',
        view=views.VideoListByTag.as_view(),
        name='videos-by-tag'
    ),
]
