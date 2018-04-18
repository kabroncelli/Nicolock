# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^file-download/$',
        view=views.FileDownload.as_view(),
        name='file-download'
    ),
    url(
        regex=r'^technical-specs/$',
        view=views.ProductSpecList.as_view(),
        name='technical-specs'
    ),
    url(
        regex=r'^(?P<pk>\d+)/embed/$',
        view=views.ProductEmbed.as_view(),
        name='product-embed'
    ),
    url(
        regex=r'^(?P<category_slug>[-\w]+)/$',
        view=views.CategoryProductList.as_view(),
        name='category'
    ),
    url(
        regex=r'^(?P<category_slug>[-\w]+)/(?P<product_slug>[-\w]+)/$',
        view=views.ProductDetail.as_view(),
        name='product-detail'
    ),
]
