from django.core.urlresolvers import reverse
from django.http import Http404, HttpResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import DetailView, View

from .models import Innovation


class InnovationRedirect(View):

    def get(self, request):
        innovation = Innovation.objects.all().order_by('id').first()
        if not innovation:
            raise Http404('Page not found')
        url_kwargs = {
            'innovation_slug': innovation.slug
        }
        url = reverse('innovation:detail', kwargs=url_kwargs)
        return redirect(url)


class InnovationDetail(DetailView):
    template_name = 'innovation/innovation_detail.html'
    model = Innovation
    context_object_name = 'innovation'

    def get_context_data(self, **kwargs):
        context = super(InnovationDetail, self).get_context_data(**kwargs)
        context['innovations'] = Innovation.objects.all()
        return context

    def get_object(self):
        return get_object_or_404(Innovation.objects.prefetch_related(),
                                 slug=self.kwargs['innovation_slug'])
