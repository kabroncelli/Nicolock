# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import Dealer


class DealerSerializer(serializers.ModelSerializer):

    lat = serializers.DecimalField(
        coerce_to_string=False, max_digits=9, decimal_places=6)
    lng = serializers.DecimalField(
        coerce_to_string=False, max_digits=9, decimal_places=6)

    class Meta:
        model = Dealer
        fields = '__all__'
