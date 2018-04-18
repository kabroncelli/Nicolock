# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^events/$',
        view=views.EventsMonthView.as_view(),
        name='list'
    ),
    url(
        regex=r'^events/(?P<slug>[-\w]+)/$',
        view=views.EventDetail.as_view(),
        name='detail'
    )
]
