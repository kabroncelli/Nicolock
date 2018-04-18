# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import get_nearby_postal_codes
from .forms import SearchForm
from nicolock.core.serializers import GroupedHaystackSearchSerializer

from nicolock.products.models import Image, Product, Spec


class NearbyPostalCodes(APIView):

    def get(self, request):
        radius = request.GET.get('radius')
        postal_code = request.GET.get('postal_code')
        if not postal_code:
            return Response(
                {'message': 'please pass a postal code query param'},
                status=status.HTTP_400_BAD_REQUEST)
        postal_codes = get_nearby_postal_codes(postal_code, radius)
        return Response(postal_codes, status=status.HTTP_200_OK)


class RestSearchView(APIView):

    def get(self, request):
        form = SearchForm(request.GET or None)
        if form.is_valid():
            results = form.search(form.cleaned_data)
            return Response(GroupedHaystackSearchSerializer(results).data, status=status.HTTP_200_OK)
        return Response(
            {'message': 'please pass a query param for search'},
            status=status.HTTP_400_BAD_REQUEST)
