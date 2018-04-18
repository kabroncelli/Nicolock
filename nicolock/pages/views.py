from django.http import Http404, HttpResponsePermanentRedirect
from django.conf import settings
from django.contrib.flatpages import views
from django.contrib.flatpages.models import FlatPage
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404


def page(request, url):
    if not url.startswith('/'):
        url = '/' + url
    site_id = get_current_site(request).id
    try:
        f = get_object_or_404(
            FlatPage, url=url, sites=site_id, page__published=True)
    except Http404:
        if not url.endswith('/') and settings.APPEND_SLASH:
            url += '/'
            f = get_object_or_404(
                FlatPage, url=url, sites=site_id, page__published=True)
            return views.flatpage(request, url)
        else:
            raise
    return views.flatpage(request, url)
