from django.shortcuts import render
from django.views.generic import ListView

from .models import Faq


class FaqList(ListView):
    model = Faq
    queryset = Faq.objects.all()
    context_object_name = 'faqs'
