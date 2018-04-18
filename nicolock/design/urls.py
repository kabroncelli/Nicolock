# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from . import views


urlpatterns = [
    url(
        regex=r'^$',
        view=views.DesignIdeaList.as_view(),
        name='redirect'
    ),
    url(
        regex=r'^(?P<design_idea_slug>[-\w]+)/$',
        view=views.DesignDetail.as_view(),
        name='detail'
    )
]
