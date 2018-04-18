# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^faqs/$',
        view=views.FaqList.as_view(),
        name='list'
    ),
    url(
        regex=r'^faqs/(?P<pk>\d+)/$',
        view=views.FaqItem.as_view(),
        name='faq'
    )
]
