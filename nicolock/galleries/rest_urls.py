# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^items/create-from-image/(?P<image_id>\d+)/?$',
        view=views.ItemCreateFromImage.as_view(),
        name='item-create-from-product-image'
    ),
    url(
        regex=r'^items/?$',
        view=views.ItemCreate.as_view(),
        name='item-create'
    ),
    url(
        regex=r'^items/(?P<pk>\d+)/?$',
        view=views.ItemDetail.as_view(),
        name='item-detail'
    ),
    url(
        regex=r'^galleries/?$',
        view=views.GalleryListCreate.as_view(),
        name='gallery-list-create'
    ),
    url(
        regex=r'^galleries/(?P<pk>\d+)/?$',
        view=views.GalleryDetail.as_view(),
        name='gallery-detail'
    ),
    url(
        regex=r'^email-items/?$',
        view=views.EmailItems.as_view(),
        name='email-items'
    ),
]
