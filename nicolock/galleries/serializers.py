# -*- coding: utf-8 -*-
from django.core.mail import send_mail
from django.contrib.sites.models import Site
from django.conf import settings

from rest_framework import serializers

from . import models


class ItemSerializer(serializers.ModelSerializer):

    thumbnail = serializers.SerializerMethodField()
    large_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = models.Item
        fields = '__all__'

    def get_thumbnail(self, obj):
        return obj.thumbnail.url

    def get_large_thumbnail(self, obj):
        return obj.large_thumbnail.url


class GallerySerializer(serializers.ModelSerializer):

    items = ItemSerializer(many=True, read_only=True)
    gallery_type = serializers.SerializerMethodField()

    class Meta:
        model = models.Gallery
        fields = '__all__'

    def get_gallery_type(self, obj):
        return obj.user.user_type


class SimpleGallerySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Gallery
        fields = ['id', 'name']


class EmailItemsSerializer(serializers.Serializer):
    items = serializers.PrimaryKeyRelatedField(
        queryset=models.Item.objects.all(), many=True)
    email = serializers.EmailField()
    message = serializers.CharField()

    def create(self, validated_data):
        request = self.context.get("request")
        site = Site.objects.get(id=settings.SITE_ID)
        image_urls = [site.domain + item.original.url for item
                      in validated_data['items']]
        message = validated_data['message']
        for url in image_urls:
            message += '\n{0}'.format(url)
        send_mail(
            'Check out these images!',
            message,
            request.user.email if request and not request.user.is_anonymous() else 'info@nicolock.com',
            [validated_data['email']]
        )
        return {'message': 'Items emailed successfully'}
