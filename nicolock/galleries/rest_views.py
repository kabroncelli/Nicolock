# -*- coding: utf-8 -*-
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .serializers import ItemSerializer, GallerySerializer, EmailItemsSerializer
from .models import Item, Gallery
from nicolock.products.models import Image
from nicolock.core.mixins import IsAuthorized


class ItemCreateFromImage(IsAuthorized, generics.CreateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            product_image = Image.objects.get(id=kwargs['image_id'])
        except Image.DoesNotExist:
            raise NotFound('Image was not found')
        if hasattr(request.data, '_mutable'):
            request.data._mutable = True
        request.data['name'] = product_image.name
        request.data['original'] = product_image.original
        return super(ItemCreateFromImage, self).create(request, *args, **kwargs)


class ItemCreate(IsAuthorized, generics.CreateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDetail(IsAuthorized, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        user = self.request.user
        return Item.objects.filter(gallery__user=user)


class GalleryListCreate(IsAuthorized, generics.ListCreateAPIView):
    serializer_class = GallerySerializer

    def create(self, request, *args, **kwargs):
        if hasattr(request.data, '_mutable'):
            request.data._mutable = True
        request.data['user'] = request.user.id
        return super(GalleryListCreate, self).create(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user 
        return Gallery.objects.filter(user=user)


class GalleryDetail(IsAuthorized, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GallerySerializer

    def get_queryset(self):
        user = self.request.user 
        return Gallery.objects.filter(user=user)


class EmailItems(APIView):
    serializer_class = EmailItemsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        res = serializer.save()
        return Response(res, status=status.HTTP_200_OK)
