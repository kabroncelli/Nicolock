# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.views.generic import TemplateView
from django.views import defaults as default_views

from allauth.account.views import confirm_email

from nicolock.core.views import pages_router
from nicolock.core.sitemaps import sitemaps
from nicolock.users.views import FindContractors


urlpatterns = [
    url(settings.ADMIN_URL, admin.site.urls),
    url(r'^nested_admin/', include('nested_admin.urls')),
    url(r'^froala_editor/', include('froala_editor.urls')),

    url(
        regex=r'^$',
        view=TemplateView.as_view(template_name='pages/home.html'),
        name='home'
    ),

    url(
        regex=r'^contractors/$',
        view=FindContractors.as_view(),
        name='find-contractors'
    ),

    url(
        regex=r'^users/',
        view=include('nicolock.users.urls', namespace='users')
    ),
    url(
        regex=r'^accounts/',
        view=include('allauth.urls')
    ),
    url(
        regex=r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$',
        view=confirm_email,
        name="account_confirm_email"
    ),
    url(
        regex=r'^rest-auth/',
        view=include('rest_auth.urls')
    ),
    url(
        regex=r'^rest-auth/registration/',
        view=include('rest_auth.registration.urls')
    ),

    url(
        regex=r'^rest/',
        view=include('nicolock.users.rest_urls', namespace='rest-users')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.products.rest_urls', namespace='rest-products')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.videos.rest_urls', namespace='rest-videos')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.dealers.rest_urls', namespace='rest-dealers')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.salesreps.rest_urls', namespace='rest-salesreps')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.galleries.rest_urls', namespace='rest-galleries')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.core.rest_urls', namespace='rest-core')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.faqs.rest_urls', namespace='rest-faqs')
    ),
    url(
        regex=r'^rest/',
        view=include('nicolock.events.rest_urls', namespace='rest-events')
    ),
    url(
        regex=r'^products/',
        view=include('nicolock.products.urls', namespace='products')
    ),
    url(
        regex=r'^videos/',
        view=include('nicolock.videos.urls', namespace='videos')
    ),
    url(
        regex=r'^dealers/',
        view=include('nicolock.dealers.urls', namespace='dealers')
    ),
    url(
        regex=r'^faqs/',
        view=include('nicolock.faqs.urls', namespace='faqs')
    ),
    url(
        regex=r'^design-ideas/',
        view=include('nicolock.design.urls', namespace='design')
    ),
    url(
        regex=r'^image-library/',
        view=include('nicolock.library.urls', namespace='library')
    ),
    url(
        regex=r'^innovation/',
        view=include('nicolock.innovation.urls', namespace='innovation')
    ),

    url(
        regex=r'^',
        view=include('nicolock.galleries.urls', namespace='galleries')
    ),
    url(
        regex=r'^',
        view=include('nicolock.events.urls', namespace='events')
    ),

    url(
        regex=r'^',
        view=include('nicolock.core.urls', namespace='core')
    ),

    # Flat Pages/Landing Pages
    url(
        regex=r'^(?P<url>[-\w]+)/$',
        view=pages_router,
        name='pages'
    ),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Django sitemap
urlpatterns += [
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
        name='django.contrib.sitemaps.views.sitemap')
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        url(r'^500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns += [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ]
