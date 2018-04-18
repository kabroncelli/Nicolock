# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import SalesRep


class SalesRepSerializer(serializers.ModelSerializer):
    postal_code = serializers.SerializerMethodField()
    lat = serializers.SerializerMethodField()
    lng = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = SalesRep
        exclude = ('postal_codes', 'original',)

    def get_postal_code(self, obj):
        if hasattr(obj, 'postal_code'):
            return obj.postal_code
        return None

    def get_lat(self, obj):
        if hasattr(obj, 'lat'):
            return obj.lat
        return None

    def get_lng(self, obj):
        if hasattr(obj, 'lng'):
            return obj.lng
        return None

    def get_thumbnail(self, obj):
        return obj.thumbnail.url
