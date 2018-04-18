# -*- coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer

from . import models


class VideoSerializer(ModelSerializer):

    class Meta:
        model = models.Video
        fields = '__all__'


class TagSerializer(ModelSerializer):

    class Meta:
        model = models.Tag
        fields = '__all__'
