# -*- coding: utf-8 -*-
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import (CompanyProfileSerializer, ContractorSerializer,
                          ContractorListSerializer, ContractorMapSerializer)
from .models import CompanyProfile, User, ContractorList as ContractorListModel
from nicolock.core.mixins import IsAuthorized, AllowAny


class UserCompanyProfileDetail(RetrieveUpdateAPIView):

    serializer_class = CompanyProfileSerializer

    def get_object(self):
        instance, created = CompanyProfile.objects.get_or_create(
            user=self.request.user)
        return instance


class HomeownerContractorListDetail(IsAuthorized, RetrieveUpdateAPIView):

    serializer_class = ContractorListSerializer

    def get_object(self):
        instance, created = ContractorListModel.objects.get_or_create(
            homeowner=self.request.user)
        return instance


class ContractorListAddRemove(IsAuthorized, APIView):
    serializer_class = ContractorMapSerializer

    def post(self, request, *args, **kwargs):
        instance, created = ContractorListModel.objects.get_or_create(
            homeowner=self.request.user)
        contractor = User.objects.filter(
            id=kwargs.get('contractor_id', 0), user_type='contractor').first()
        if contractor:
            instance.contractors.add(contractor)
        return Response(
            ContractorListSerializer(instance).data,
            status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        instance, created = ContractorListModel.objects.get_or_create(
            homeowner=self.request.user)
        contractor = User.objects.filter(
            id=kwargs.get('contractor_id', 0), user_type='contractor').first()
        if contractor:
            instance.contractors.remove(contractor)
        return Response(
            ContractorListSerializer(instance).data,
            status=status.HTTP_200_OK)


class ContractorList(AllowAny, APIView):

    def get_contractors(self, postal_codes):
        contractors = CompanyProfile.objects.none()
        for postal_code in postal_codes:
            contractors = contractors | CompanyProfile.objects.filter(
                postal_code=postal_code)
        return contractors

    def post(self, request, *args, **kwargs):
        postal_codes = self.request.data.get('postal_codes', [])
        contractors = self.get_contractors(postal_codes)
        return Response(
            ContractorMapSerializer(contractors, many=True).data,
            status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        postal_codes = self.request.GET.getlist('postal_code')
        contractors = self.get_contractors(postal_codes)
        return Response(
            ContractorMapSerializer(contractors, many=True).data,
            status=status.HTTP_200_OK
        )
