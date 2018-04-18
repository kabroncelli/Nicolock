# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from . import models


class ProductListSerializer(ModelSerializer):

    class Meta:
        model = models.Product
        fields = ['id', 'name']


class CategorySerializer(ModelSerializer):
    products = ProductListSerializer(many=True)

    class Meta:
        model = models.Category
        fields = '__all__'


class ImageSerializer(ModelSerializer):
    large_thumbnail = SerializerMethodField()
    thumbnail = SerializerMethodField()
    url = SerializerMethodField()

    class Meta:
        model = models.Image
        fields = '__all__'

    def get_large_thumbnail(self, obj):
        return obj.large_thumbnail.url

    def get_thumbnail(self, obj):
        return obj.thumbnail.url

    def get_url(self, obj):
        return obj.get_absolute_url()


class SpecSerializer(ModelSerializer):

    class Meta:
        model = models.Spec
        fields = '__all__'


class PatternSerializer(ModelSerializer):
    large_thumbnail = SerializerMethodField()
    thumbnail = SerializerMethodField()

    class Meta:
        model = models.Pattern
        fields = '__all__'

    def get_large_thumbnail(self, obj):
        return obj.large_thumbnail.url

    def get_thumbnail(self, obj):
        return obj.thumbnail.url


class ColorSerializer(ModelSerializer):

    class Meta:
        model = models.Color
        fields = '__all__'


class FileSerializer(ModelSerializer):

    class Meta:
        model = models.File
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    images = ImageSerializer(many=True)
    specs = SpecSerializer(many=True)
    patterns = PatternSerializer(many=True)
    colors = ColorSerializer(many=True)
    files = FileSerializer(many=True)
    url = SerializerMethodField()

    class Meta:
        model = models.Product
        fields = '__all__'

    def get_url(self, obj):
        return obj.get_absolute_url()
