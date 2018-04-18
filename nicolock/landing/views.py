from django.views.generic import DetailView

from .models import LandingPage
from nicolock.products.models import Product
from nicolock.videos.models import Video


class LandingPageDetailView(DetailView):
    model = LandingPage
    context_object_name = 'page'

    def get_context_data(self, **kwargs):
        context = super(LandingPageDetailView, self).get_context_data(**kwargs)
        context['products'] = Product.objects.all()[:5]
        context['videos'] = Video.objects.all()[:5]
        return context

    def get_template_names(self):
        return ['landing/{}.html'.format(self.object.template.type)]
