from django.conf.urls import url

from . import rest_views as views

urlpatterns = [
    url(
        regex=r'^events/?$',
        view=views.EventList.as_view(),
        name='list'
    ),
]
