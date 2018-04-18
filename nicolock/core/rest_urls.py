# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^postal-codes/$',
        view=views.NearbyPostalCodes.as_view(),
        name='nearby-postal-codes'
    ),
    url(
        regex=r'^search/$',
        view=views.RestSearchView.as_view(),
        name='search'
    )
]
