# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import ListView

from .models import Dealer


class DealerList(ListView):
    model = Dealer
    queryset = Dealer.objects.all()
