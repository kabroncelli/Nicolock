from rest_framework.serializers import ModelSerializer

from . import models


class EventSerializer(ModelSerializer):

    class Meta:
        model = models.Event
        fields = '__all__'
