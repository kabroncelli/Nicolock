# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse
from django.views.generic import ListView, DetailView

from .models import Image
from nicolock.galleries.models import Gallery


class LibraryList(ListView):
    model = Image
    queryset = Image.objects.all()

    context_object_name = 'images'


class LibraryDetail(DetailView):
    model = Image
    context_object_name = 'image'

    def get_context_data(self, **kwargs):
        context = super(LibraryDetail, self).get_context_data(**kwargs)
        if self.request.user.is_authenticated():
            context['user_galleries'] = Gallery.objects.filter(user=self.request.user)
        context['selected_image'] = context['image']
        context['add_to_gallery_url'] = reverse(
            'galleries:add-library-image-to-gallery',
            kwargs={'image_id': context['selected_image'].id})
        # TODO: Probably not the best idea... may hurt performance
        # see: https://docs.djangoproject.com/en/dev/ref/models/querysets/#django.db.models.query.QuerySet.order_by
        context['other_images'] = Image.objects.exclude(
            id=context['image'].id).order_by('?')[:12]
        return context
