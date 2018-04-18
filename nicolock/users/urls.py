# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^email-users/$',
        view=views.SendUserEmails.as_view(),
        name='email'
    ),
    url(
        regex=r'^$',
        view=views.UserList.as_view(),
        name='list'
    ),
    url(
        regex=r'^~redirect/$',
        view=views.UserRedirect.as_view(),
        name='redirect'
    ),
    url(
        regex=r'^account/$',
        view=views.UserUpdate.as_view(),
        name='update'
    ),
    url(
        regex=r'^~update/company-profile/$',
        view=views.CompanyProfileUpdate.as_view(),
        name='update-company-profile'
    ),
    url(
        regex=r'^company-profile/(?P<slug>[-\w]+)/$',
        view=views.CompanyProfileDetail.as_view(),
        name='company-profile-detail'
    ),
    url(
        regex=r'^manage-contractors/$',
        view=views.ManageContractors.as_view(),
        name='manage-contractors'
    ),
]
