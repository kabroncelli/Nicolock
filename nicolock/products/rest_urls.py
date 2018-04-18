# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^products/(?P<pk>\d+)/$',
        view=views.ProductDetail.as_view(),
        name='product-detail'
    ),
    url(
        regex=r'^products/(?P<pk>\d+)/like/$',
        view=views.ProductLike.as_view(),
        name='product-like'
    ),
    url(
        regex=r'^categories/$',
        view=views.CategoryList.as_view(),
        name='category-list'
    ),
    url(
        regex=r'^categories/(?P<pk>\d+)/$',
        view=views.CategoryDetail.as_view(),
        name='category-detail'
    ),
]
