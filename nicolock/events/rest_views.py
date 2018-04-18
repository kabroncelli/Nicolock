from datetime import date, timedelta

from rest_framework import generics

from .serializers import EventSerializer
from .models import Event
from nicolock.core.mixins import AllowAny


class EventList(AllowAny, generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        try:
            month = int(self.request.GET.get('month', date.today().month))
        except (ValueError, TypeError):
            month = date.today().month
        try:
            year = int(self.request.GET.get('year', date.today().year))
        except (ValueError, TypeError):
            month = date.today().year
        min_date = date(year=year, month=month, day=1)
        return Event.objects.filter(
            start_date__gte=min_date-timedelta(days=1),
            start_date__lte=min_date+timedelta(days=32))
