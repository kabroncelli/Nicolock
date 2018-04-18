# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^$',
        view=views.LibraryList.as_view(),
        name='list'
    ),
    url(
        regex=r'^(?P<slug>[-\w]+)/$',
        view=views.LibraryDetail.as_view(),
        name='detail'
    ),
]
