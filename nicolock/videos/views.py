# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import ListView, DetailView

from .models import Video, Tag


class VideoList(ListView):
    model = Video

    def get_queryset(self):
        qs = Video.objects.all()
        tag_id = self.request.GET.get('tag')
        if tag_id:
            qs = qs.filter(tags=tag_id)
        search = self.request.GET.get('search')
        if search:
            qs = qs.filter(name__icontains=search)
        return qs

    def get_context_data(self, **kwargs):
        context = super(VideoList, self).get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        return context


class VideoDetail(DetailView):
    model = Video
