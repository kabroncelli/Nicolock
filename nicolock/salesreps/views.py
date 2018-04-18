# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import ListView

from .models import SalesRep


class SalesRepList(ListView):
    model = SalesRep

    queryset = SalesRep.objects.all()
    context_object_name = 'salesreps'