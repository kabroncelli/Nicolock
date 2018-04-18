# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Faq
from .serializers import FaqSerializer


class FaqList(ListAPIView):
    serializer_class = FaqSerializer
    queryset = Faq.objects.all()


# NEED A CLASS
class FaqItem(RetrieveAPIView):
    serializer_class = FaqSerializer
    queryset = Faq.objects.all()
    
