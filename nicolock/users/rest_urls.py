# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^users/me/company-profile/?$',
        view=views.UserCompanyProfileDetail.as_view(),
        name='company-profile-detail'
    ),
    url(
        regex=r'^contractor-list/?$',
        view=views.HomeownerContractorListDetail.as_view(),
        name='contractor-list-detail'
    ),
    url(
        regex=r'^contractor-list/edit/(?P<contractor_id>\d+)/?$',
        view=views.ContractorListAddRemove.as_view(),
        name='contractor-update'
    ),
    url(
        regex=r'^contractors/?$',
        view=views.ContractorList.as_view(),
        name='contractor-list'
    ),
]
