# -*- coding: utf-8 -*-
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import VideoSerializer, TagSerializer
from .models import Video, Tag
from nicolock.core.mixins import AllowAny

class VideoList(generics.ListAPIView):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()


class TagList(generics.ListAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class VideoListByTag(generics.ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self):
        tag_id = int(self.kwargs.get('pk', '0'))
        return Video.objects.filter(tags__id=tag_id)


class VideoLike(AllowAny, APIView):

    def post(self, request, *args, **kwargs):
        video_id = self.kwargs.get('pk')
        if video_id:
            video = Video.objects.filter(id=video_id).first()
            if video:
                video.like_count += 1
                video.save()
        return Response({'message': 'Success!'}, status=status.HTTP_200_OK)
