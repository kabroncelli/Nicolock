from django.core.urlresolvers import reverse
from django.http import Http404, HttpResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.generic import DetailView, View

from .models import DesignIdea


class DesignIdeaList(View):

    def get(self, request):
        designidea = DesignIdea.objects.all().order_by('id').first()
        if not designidea:
            raise Http404('Sorry, no design ideas were found')
        url_kwargs = {
            'design_idea_slug': designidea.slug
        }
        url = reverse('design:detail', kwargs=url_kwargs)
        return redirect(url)


class DesignDetail(DetailView):
    template_name = 'design/designidea_detail.html'
    model = DesignIdea
    context_object_name = 'designidea'

    def get_context_data(self, **kwargs):
        context = super(DesignDetail, self).get_context_data(**kwargs)
        context['designideas'] = DesignIdea.objects.all()
        return context

    def get_object(self):
        return get_object_or_404(DesignIdea.objects.prefetch_related(),
                                 slug=self.kwargs['design_idea_slug'])
