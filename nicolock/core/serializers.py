
from rest_framework import serializers

from nicolock.products.models import Image, Product, Spec
# from nicolock.users.models import CompanyProfile
# from nicolock.videos.models import Video
# from nicolock.dealers.models import Dealer
# from django.contrib.flatpages.models import FlatPage

from nicolock.products.serializers import (
    ProductSerializer, ImageSerializer, SpecSerializer)
# from nicolock.users.serializers import CompanyProfileSerializer
# from nicolock.videos.serializers import VideoSerializer
# from nicolock.dealers.serializers import DealerSerializer
# from nicolock.core.search_indexes import FlatPageIndex


class GroupedHaystackSearchSerializer(serializers.Serializer):
    products = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    specs = serializers.SerializerMethodField()
    # companyprofiles = serializers.SerializerMethodField()
    # videos = serializers.SerializerMethodField()
    # dealers = serializers.SerializerMethodField()
    # flatpages = serializers.SerializerMethodField()

    def get_products(self, obj):
        products = [x.object for x in obj.models(Product)]
        return ProductSerializer(products, many=True).data

    def get_images(self, obj):
        images = [x.object for x in obj.models(Image)]
        return ImageSerializer(images, many=True).data

    def get_specs(self, obj):
        specs = [x.object for x in obj.models(Spec)]
        return SpecSerializer(specs, many=True).data

    # def get_companyprofiles(self, obj):
    #     companies = [x.object for x in obj.models(CompanyProfile)]
    #     return CompanyProfileSerializer(companies, many=True).data
    #
    # def get_videos(self, obj):
    #     videos = [x.object for x in obj.models(Video)]
    #     return VideoSerializer(videos, many=True).data
    #
    # def get_dealers(self, obj):
    #     dealers = [x.object for x in obj.models(Dealer)]
    #     return DealerSerializer(dealers, many=True).data
    #
    # def get_flatpages(self, obj):
    #     flatpages = [x.object for x in obj.models(FlatPage)]
    #     return FlatPageSerializer(flatpages, many=True).data


# class FlatPageSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = FlatPage
#         fields = '__all__'
