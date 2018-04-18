# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
import zipfile
from io import BytesIO
import json

from django.core.urlresolvers import reverse
from django.http import Http404, HttpResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import DetailView, View, ListView

from .models import Product, Category, File, ColorCategory
from .mixins import AllowEmbedMixin
from .forms import ProductImageForm
from nicolock.galleries.models import Gallery
from nicolock.galleries.serializers import SimpleGallerySerializer
from nicolock.menus.models import Menu
from nicolock.landing.models import LandingPage


class CategoryProductList(ListView):
    template_name = 'products/category_product_list.html'
    model = Product
    context_object_name = 'products'

    def get_context_data(self, **kwargs):
        context = super(CategoryProductList, self).get_context_data(**kwargs)
        context['category'] = Category.objects.get(
            slug=self.kwargs['category_slug'])
        return context

    def get_queryset(self):
        return Product.objects.filter(
            category__slug=self.kwargs['category_slug'])


class ProductEmbed(AllowEmbedMixin, DetailView):
    template_name = 'products/product_embed.html'
    model = Product


class ProductDetail(DetailView):
    template_name = 'products/product_detail.html'
    model = Product
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super(ProductDetail, self).get_context_data(**kwargs)
        context['base_breadcrumb'] = self.request.session.get('base_breadcrumb')
        context['categories'] = Category.objects.all().prefetch_related('products')
        if self.request.user.is_authenticated():
            galleries = Gallery.objects.filter(user=self.request.user)
            context['user_galleries'] = galleries
            context['user_galleries_json'] = json.dumps(
                SimpleGallerySerializer(galleries, many=True).data)
        form = ProductImageForm(self.request.GET or None)
        if form.is_valid():
            context['selected_image'] = form.image_object
        else:
            context['selected_image'] = context['object'].images.first()
        if context['selected_image']:
            context['add_to_gallery_url'] = reverse(
                'galleries:add-product-image-to-gallery',
                kwargs={'image_id': context['selected_image'].id})
        return context

    def get_object(self):
        return get_object_or_404(Product.objects.prefetch_related(),
                                 slug=self.kwargs['product_slug'],
                                 category__slug=self.kwargs['category_slug'])


class FileDownload(View):

    def get(self, request, *args, **kwargs):
        file_ids = request.GET.getlist('id')
        if file_ids:
            stream = BytesIO()
            temp_zip_file = zipfile.ZipFile(stream, 'w')
            files = [File.objects.filter(id=file_id).first() for file_id in file_ids]
            for file in files:
                if file:
                    temp_zip_file.writestr(file.file.name, file.file.read())
            temp_zip_file.close()
            response = HttpResponse(stream.getvalue(), content_type='application/zip')
            response['Content-Disposition'] = 'attachment; filename="file_downloads.zip"'
            return response
        else:
            raise Http404('No files to download')


class ProductSpecList(ListView):
    template_name = 'products/products_spec_list.html'
    model = Product
    context_object_name = 'products'

    def get_context_data(self, **kwargs):
        context = super(ProductSpecList, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context

    def get_queryset(self):
        query_kwargs = {}
        category = self.request.GET.get('category', None)
        if category:
            query_kwargs['category__name__icontains'] = category
        products = Product.objects.filter(**query_kwargs).prefetch_related('specs')
        return products
