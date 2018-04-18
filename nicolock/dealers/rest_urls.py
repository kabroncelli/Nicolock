# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^dealers/$',
        view=views.DealerList.as_view(),
        name='list'
    )
]
