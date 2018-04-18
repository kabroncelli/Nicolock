from django.views.generic.base import TemplateView
from django.views.generic import DetailView

from django.shortcuts import get_object_or_404

from .models import Event


class EventsMonthView(TemplateView):
    template_name = 'events/events_list.html'


class EventDetail(DetailView):
    template_name = 'events/event_detail.html'
    model = Event
    context_object_name = 'event'

    def get_context_data(self, **kwargs):
        context = super(EventDetail, self).get_context_data(**kwargs)
        context['event'] = Event.objects.all()
        return context

    def get_object(self):
        return get_object_or_404(Event.objects.prefetch_related(),
                                 slug=self.kwargs['slug'])