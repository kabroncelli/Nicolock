# -*- coding: utf-8 -*-
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category
from nicolock.core.mixins import AllowAny


class ProductDetail(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductLike(AllowAny, APIView):

    def post(self, request, *args, **kwargs):
        product_id = self.kwargs.get('pk')
        if product_id:
            product = Product.objects.filter(id=product_id).first()
            if product:
                product.like_count += 1
                product.save()
        return Response({'message': 'Success!'}, status=status.HTTP_200_OK)


class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryDetail(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
