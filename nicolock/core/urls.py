# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^search/$',
        view=views.Search.as_view(),
        name='search'
    ),
    url(
        regex=r'^quote/$',
        view=views.Quote.as_view(),
        name='quote'
    ),
    url(
        regex=r'^contact/$',
        view=views.Contact.as_view(),
        name='contact'
    ),
    url(
        regex=r'^customer-service-request/$',
        view=views.CustomerServiceRequest.as_view(),
        name='customer-service-request'
    )
]
