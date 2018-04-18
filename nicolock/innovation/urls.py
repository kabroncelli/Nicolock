# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^$',
        view=views.InnovationRedirect.as_view(),
        name='redirect'
    ),
    url(
        regex=r'^(?P<innovation_slug>[-\w]+)/$',
        view=views.InnovationDetail.as_view(),
        name='detail'
    )
]
