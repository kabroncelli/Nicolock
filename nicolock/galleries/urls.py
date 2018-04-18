# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^inspiration/$',
        view=views.InspirationList.as_view(),
        name='inspiration-list'
    ),
    url(
        regex=r'^inspiration/(?P<slug>[-\w]+)/$',
        view=views.InspirationDetail.as_view(),
        name='inspiration-detail'
    ),
    url(
        regex=r'^galleries/add/$',
        view=views.GalleryCreate.as_view(),
        name='gallery-add'
    ),
    url(
        regex=r'^projects/(?P<project_slug>[-\w]+)/gallery-add/$',
        view=views.GalleryCreate.as_view(),
        name='gallery-add-from-project'
    ),
    url(
        regex=r'^galleries/(?P<slug>[-\w]+)/$',
        view=views.GalleryDetail.as_view(),
        name='gallery-detail'
    ),
    url(
        regex=r'^galleries/(?P<slug>[-\w]+)/edit/$',
        view=views.GalleryUpdate.as_view(),
        name='gallery-edit'
    ),
    url(
        regex=r'^galleries/(?P<slug>[-\w]+)/delete/$',
        view=views.GalleryDelete.as_view(),
        name='gallery-delete'
    ),
    url(
        regex=r'^(?P<user_slug>[-\w]+)/projects/$',
        view=views.ProjectList.as_view(),
        name='project-list'
    ),
    url(
        regex=r'^projects/add/$',
        view=views.ProjectCreate.as_view(),
        name='project-add'
    ),
    url(
        regex=r'^projects/(?P<slug>[-\w]+)/$',
        view=views.ProjectDetail.as_view(),
        name='project-detail'
    ),
    url(
        regex=r'^projects/(?P<slug>[-\w]+)/edit/$',
        view=views.ProjectUpdate.as_view(),
        name='project-edit'
    ),
    url(
        regex=r'^projects/(?P<slug>[-\w]+)/delete/$',
        view=views.ProjectDelete.as_view(),
        name='project-delete'
    ),
    url(
        regex=r'^galleries/(?P<slug>[-\w]+)/items/$',
        view=views.ItemList.as_view(),
        name='item-list'
    ),
    url(
        regex=r'^galleries/items/add/$',
        view=views.ItemCreate.as_view(),
        name='item-add'
    ),
    url(
        regex=r'^galleries/items/(?P<slug>[-\w]+)/edit/$',
        view=views.ItemUpdate.as_view(),
        name='item-edit'
    ),
    url(
        regex=r'^galleries/items/(?P<slug>[-\w]+)/delete/$',
        view=views.ItemDelete.as_view(),
        name='item-delete'
    ),
    url(
        regex=r'^galleries/(?P<image_id>\d+)/add-product-image/$',
        view=views.AddProductImageToGallery.as_view(),
        name='add-product-image-to-gallery'
    ),
    url(
        regex=r'^galleries/(?P<image_id>\d+)/add-library-image/$',
        view=views.AddLibraryImageToGallery.as_view(),
        name='add-library-image-to-gallery'
    ),
    url(
        regex=r'^(?P<user_slug>[-\w]+)/galleries/$',
        view=views.GalleryList.as_view(),
        name='gallery-list'
    ),
]