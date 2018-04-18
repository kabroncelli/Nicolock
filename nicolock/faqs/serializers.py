# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import Faq


class FaqSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', read_only=True)

    class Meta:
        model = Faq
        fields = '__all__'
