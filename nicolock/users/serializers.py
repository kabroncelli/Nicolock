# -*- coding: utf-8 -*-
from rest_framework import serializers

from .models import User, CompanyProfile, ContractorList


class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'user_type',
            'name',
            'email',
            'password',
            'postal_code'
        ]

    # Django rest auth requires the save method to accept the request
    # for some reason
    def save(self, request):
        return super(UserRegistrationSerializer, self).save()


class CompanyProfileMapSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProfile
        fields = ('longitude', 'latitude', 'url')

    def get_url(self, obj):
        return obj.get_absolute_url()


class CompanyProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyProfile
        fields = '__all__'
        read_only_fields = ('longitude', 'latitude')


class ContractorSerializer(serializers.ModelSerializer):
    companyprofile = CompanyProfileSerializer()

    class Meta:
        model = User
        fields = [
            'id', 'name', 'email', 'postal_code', 'user_type', 'companyprofile'
        ]


class ContractorMapSerializer(serializers.ModelSerializer):
    lat = serializers.SerializerMethodField()
    lng = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    profile_url = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProfile
        fields = [
            'id', 'user_id', 'postal_code', 'lng', 'lat', 'thumbnail', 'name',
            'address_line_one', 'address_line_two', 'address', 'city', 'state',
            'phone', 'email', 'profile_url', 'certifications'
        ]

    def get_lat(self, obj):
        return obj.latitude

    def get_lng(self, obj):
        return obj.longitude

    def get_thumbnail(self, obj):
        if obj.large_thumbnail:
            return obj.large_thumbnail.url
        return None

    def get_profile_url(self, obj):
        return obj.get_absolute_url()

    def get_user_id(self, obj):
        if hasattr(obj, 'user'):
            return obj.user.id
        return None

    def get_address(self, obj):
        if obj.address_line_one:
            return "{0} {1}".format(
                obj.address_line_one,
                obj.address_line_two or '')
        return None


class ContractorListSerializer(serializers.ModelSerializer):
    contractor_list = serializers.SerializerMethodField()

    class Meta:
        model = ContractorList
        fields = '__all__'

    def get_contractor_list(self, obj):
        return ContractorSerializer(obj.contractors.all(), many=True).data

