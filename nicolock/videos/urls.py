# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^$',
        view=views.VideoList.as_view(),
        name='list'
    ),
    url(
        regex=r'^(?P<slug>[-\w]+)/$', 
        view=views.VideoDetail.as_view(),
        name='detail'
    ),
]
