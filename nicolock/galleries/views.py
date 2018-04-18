# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Prefetch
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse
from django.http import Http404
from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView

from . import models
from .mixins import IsProjectOwner, IsGalleryOwner
from nicolock.core.mixins import IsContractor
from nicolock.products.models import Image
from nicolock.library.models import Image as LibraryImage
from nicolock.users.models import User


class InspirationList(ListView):
    model = models.InspirationalPhoto
    queryset = models.InspirationalPhoto.objects.all()


class InspirationDetail(DetailView):
    model = models.InspirationalPhoto


class GalleryList(ListView):
    model = models.Gallery

    def get_context_data(self, **kwargs):
        context = super(GalleryList, self).get_context_data(**kwargs)
        context['user'] = User.objects.filter(slug=self.kwargs['user_slug']).first()
        return context

    def get_queryset(self):
        return models.Gallery.objects.filter(user__slug=self.kwargs['user_slug'])


class GalleryDetail(DetailView):
    model = models.Gallery
    context_object_name = 'gallery'


class GalleryCreate(LoginRequiredMixin, CreateView):
    model = models.Gallery
    fields = ('name', 'project', 'description')

    def get_context_data(self, **kwargs):
        context = super(GalleryCreate, self).get_context_data(**kwargs)
        if self.request.user.user_type == 'homeowner':
            return context
        context['projects'] = models.Project.objects.filter(user=self.request.user)
        project = models.Project.objects.filter(slug=self.kwargs.get('project_slug', '')).first()
        if project:
            context['selected_project'] = project
        return context

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return super(GalleryCreate, self).form_valid(form)

    def get_success_url(self):
        redirect_url = self.request.GET.get('from', None)
        if redirect_url:
            return redirect_url
        return super().get_success_url()


class GalleryUpdate(IsGalleryOwner, UpdateView):
    model = models.Gallery
    fields = ('name', 'description', 'project',)

    def get_context_data(self, **kwargs):
        context = super(GalleryUpdate, self).get_context_data(**kwargs)
        if self.request.user.user_type == 'homeowner':
            return context
        context['projects'] = models.Project.objects.filter(user=self.request.user)
        return context

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return super(GalleryUpdate, self).form_valid(form)


class GalleryDelete(IsGalleryOwner, DeleteView):
    model = models.Gallery

    def get_success_url(self):
        return reverse('galleries:gallery-list',
                       kwargs={'user_slug': self.object.user.slug})


class ProjectList(ListView):
    model = models.Project
    context_object_name = 'project_list'

    def get_context_data(self, **kwargs):
        context = super(ProjectList, self).get_context_data(**kwargs)
        context['user'] = User.objects.filter(slug=self.kwargs['user_slug']).first()
        return context

    def get_queryset(self):
        return models.Project.objects.filter(user__slug=self.kwargs['user_slug'])


class ProjectDetail(DetailView):
    model = models.Project
    context_object_name = 'project'


class ProjectCreate(IsContractor, CreateView):
    model = models.Project
    fields = ('name', 'description')

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return super(ProjectCreate, self).form_valid(form)

    def get_success_url(self):
        redirect_url = self.request.GET.get('from', None)
        if redirect_url:
            return redirect_url
        return reverse('galleries:project-list',
                       kwargs={'user_slug': self.object.user.slug})


class ProjectUpdate(IsContractor, IsProjectOwner, UpdateView):
    model = models.Project
    fields = ('name', 'description')

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return super(ProjectUpdate, self).form_valid(form)


class ProjectDelete(LoginRequiredMixin, DeleteView):
    model = models.Project

    def get_success_url(self):
        return reverse('galleries:project-list',
                       kwargs={'user_slug': self.object.user.slug})


class ItemCreate(LoginRequiredMixin, CreateView):
    model = models.Item
    fields = ('name', 'color', 'gallery', 'notes', 'original',)

    def get_context_data(self, **kwargs):
        context = super(ItemCreate, self).get_context_data(**kwargs)
        context['galleries'] = models.Gallery.objects.filter(
            user=self.request.user)
        try:
            selected_gallery_id = int(self.request.GET.get('gallery', 0))
        except (TypeError, ValueError):
            selected_gallery_id = None
        context['selected_gallery_id'] = selected_gallery_id
        return context

    def get_success_url(self):
        return reverse('galleries:gallery-detail',
                       kwargs={'slug': self.object.gallery.slug})


class ItemUpdate(LoginRequiredMixin, UpdateView):
    model = models.Item
    fields = ('name', 'color', 'gallery', 'notes', 'original',)

    def get_context_data(self, **kwargs):
        context = super(ItemUpdate, self).get_context_data(**kwargs)
        context['galleries'] = models.Gallery.objects.filter(
            user=self.request.user)
        try:
            selected_gallery_id = int(self.request.GET.get('gallery', 0))
        except (TypeError, ValueError):
            selected_gallery_id = None
        context['selected_gallery_id'] = selected_gallery_id
        return context

    def get_success_url(self):
        return reverse('galleries:gallery-detail',
                       kwargs={'slug': self.object.gallery.slug})


class ItemList(ListView):
    model = models.Item

    def get_queryset(self):
        return models.Item.objects.filter(gallery__slug=self.kwargs['slug'])

    def get_context_data(self, **kwargs):
        context = super(ItemList, self).get_context_data(**kwargs)
        context['gallery_slug'] = self.kwargs['slug']
        return context


class ItemDelete(LoginRequiredMixin, DeleteView):
    model = models.Item

    def get_success_url(self):
        return reverse('galleries:gallery-detail',
                       kwargs={'slug': self.object.gallery.slug})


class BaseImageGalleryAddView(LoginRequiredMixin, CreateView):
    model = models.Item
    fields = ('gallery',)

    def get(self, request, *args, **kwargs):
        try:
            self.image = self.image_model.objects.get(id=kwargs['image_id'])
        except self.image_model.DoesNotExist:
            raise Http404
        return super(BaseImageGalleryAddView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            self.image = self.image_model.objects.get(id=kwargs['image_id'])
        except self.image_model.DoesNotExist:
            raise Http404
        return super(BaseImageGalleryAddView, self).post(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(BaseImageGalleryAddView, self).get_context_data(**kwargs)
        context['image'] = self.image
        return context

    def get_form(self, *args, **kwargs):
        form = super(BaseImageGalleryAddView, self).get_form(*args, **kwargs)
        gallery_choices = models.Gallery.objects.filter(user=self.request.user)
        form.fields['gallery'].choices = gallery_choices.values_list('id', 'name')
        return form

    def get_success_url(self):
        return reverse('galleries:item-list',
                       kwargs={'slug': self.object.gallery.slug})


class AddProductImageToGallery(BaseImageGalleryAddView):

    image_model = Image

    def get_initial(self):
        initial = super(AddProductImageToGallery, self).get_initial()
        initial['name'] = self.image.product.name
        return initial

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.name = self.image.product.name
        self.object.original = self.image.original
        self.object.save()
        return super(AddProductImageToGallery, self).form_valid(form)


class AddLibraryImageToGallery(BaseImageGalleryAddView):
    image_model = LibraryImage

    def get_initial(self):
        initial = super(AddLibraryImageToGallery, self).get_initial()
        initial['name'] = self.image.name
        return initial

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.name = self.image.name
        self.object.original = self.image.original
        self.object.save()
        return super(AddLibraryImageToGallery, self).form_valid(form)
