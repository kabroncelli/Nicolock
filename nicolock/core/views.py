from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import EmailMessage
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse, Http404
from django.views import View
from django.views.generic import TemplateView, FormView
from django.views.generic.edit import CreateView
from django.utils.translation import ugettext_lazy as _

from .forms import SearchForm, QuoteForm, ContactForm, CustomerServiceRequestForm
from nicolock.products.models import Category, Product
from nicolock.users.models import User
from nicolock.videos.models import Video
from nicolock.core.serializers import GroupedHaystackSearchSerializer
from nicolock.pages.views import page as page_view
from nicolock.pages.models import Page
from nicolock.landing.views import LandingPageDetailView
from nicolock.landing.models import LandingPage


def pages_router(request, url):
    landing_page = LandingPage.objects.filter(slug=url).first()
    if landing_page:
        return LandingPageDetailView.as_view()(request, slug=url)
    return page_view(request, url)


class BaseExperienceView(TemplateView):

    def get_context_data(self, **kwargs):
        context = super(BaseExperienceView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context


class BaseSearchView(TemplateView):

    def get_context_data(self, **kwargs):
        context = super(BaseSearchView, self).get_context_data(**kwargs)
        form = self.form_class(self.request.GET or None)
        context['form'] = form
        if self.request.GET:
            context['submitted'] = True
            if form.is_valid():
                context['results'] = form.search(form.cleaned_data)
        return context


class Search(BaseSearchView):
    template_name = 'core/search.html'
    form_class = SearchForm


class Innovation(BaseExperienceView):
    template_name = 'pages/innovation.html'

    def get_context_data(self, **kwargs):
        context = super(Innovation, self).get_context_data(**kwargs)
        context['breadcrumb'] = 'innovation'
        return context


class Quote(FormView):
    template_name = 'core/quote.html'
    form_class = QuoteForm
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        staff_users = User.objects.filter(is_staff=True)
        staff_emails = [user.email for user in staff_users]
        data = form.cleaned_data
        message = "First Name: {0}\n".format(data.get('first_name'))
        message += "Last Name: {0}\n".format(data.get('last_name'))
        message += "Email: {0}\n".format(data.get('email'))
        message += "Phone: {0}\n".format(data.get('phone'))
        message += "Address: {0}\n".format(data.get('address'))
        message += "City: {0}\n".format(data.get('city'))
        message += "State: {0}\n".format(data.get('state'))
        message += "Postal Code: {0}\n".format(data.get('postal_code'))
        message += "Project Type: {0}\n".format(data.get('project_type'))
        message += "Description: {0}\n".format(data.get('description'))
        send_mail(
            'Quote Request',
            message,
            'info@nicolock.com',
            staff_emails
        )
        messages.success(self.request, _('Thanks! We will be in touch!'))
        return super(Quote, self).form_valid(form)


class Contact(FormView):
    template_name = 'core/contact.html'
    form_class = ContactForm
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        staff_users = User.objects.filter(is_staff=True)
        staff_emails = [user.email for user in staff_users]
        data = form.cleaned_data
        message = "First Name: {0}\n".format(data.get('first_name'))
        message += "Last Name: {0}\n".format(data.get('last_name'))
        message += "Email: {0}\n".format(data.get('email'))
        message += "Phone: {0}\n".format(data.get('phone'))
        message += "State: {0}\n".format(data.get('state'))
        message += "Postal Code: {0}\n".format(data.get('postal_code'))
        message += "Subject: {0}\n".format(data.get('subject'))
        message += "Message: {0}\n".format(data.get('message'))
        send_mail(
            'Contact Form Submission: {0}',
            message,
            'info@nicolock.com',
            staff_emails
        )
        messages.success(self.request, _('Thanks! We will be in touch!'))
        return super(Contact, self).form_valid(form)


class CustomerServiceRequest(FormView):
    template_name = 'core/customer-service-request.html'
    form_class = CustomerServiceRequestForm
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        data = form.cleaned_data
        message = "Install Date: {0}\n".format(data.get('install_date'))
        message += "First Name: {0}\n".format(data.get('first_name'))
        message += "Last Name: {0}\n".format(data.get('last_name'))
        message += "Address: {0}\n".format(data.get('address'))
        message += "Address 2: {0}\n".format(data.get('address2'))
        message += "City: {0}\n".format(data.get('city'))
        message += "State: {0}\n".format(data.get('state'))
        message += "Postal Code: {0}\n".format(data.get('postal_code'))
        message += "Phone: {0}\n".format(data.get('phone'))
        message += "Email: {0}\n".format(data.get('email'))
        message += "Product: {0}\n".format(data.get('pi_product'))
        if data.get('pi_colors'):
            message += "Colors: {0}\n".format(', '.join(data.get('pi_colors').values_list('name', flat=True)))
        message += "Square Feet: {0}\n".format(data.get('pi_square_feet'))
        message += "Description: {0}\n".format(data.get('pi_describe'))
        message += "Dealer Where Purchased: {0}\n".format(data.get('ii_purchased'))
        message += "Dealer Name: {0}\n".format(data.get('ii_name'))
        message += "Dealer Address: {0}\n".format(data.get('ii_address'))
        message += "Dealer Address 2: {0}\n".format(data.get('ii_address2'))
        message += "Dealer City: {0}\n".format(data.get('ii_city'))
        message += "Dealer State: {0}\n".format(data.get('ii_state'))
        message += "Dealer Postal Code: {0}\n".format(data.get('ii_postal_code'))
        message += "Dealer Phone: {0}\n".format(data.get('ii_phone'))
        message += "Dealer Cell: {0}\n".format(data.get('ii_cell'))
        message += "Dealer Email: {0}\n".format(data.get('ii_email'))
        mail = EmailMessage(
            'Customer Service Request',
            message,
            'info@nicolock.com',
            ['info@nicolock.com']
        )
        if data.get('pi_image1'):
            mail.attach(
                data.get('pi_image1').name,
                data.get('pi_image1').read(),
                data.get('pi_image1').content_type
            )
        if data.get('pi_image2'):
            mail.attach(
                data.get('pi_image2').name,
                data.get('pi_image2').read(),
                data.get('pi_image2').content_type
            )
        if data.get('pi_image3'):
            mail.attach(
                data.get('pi_image3').name,
                data.get('pi_image3').read(),
                data.get('pi_image3').content_type
            )
        mail.send()
        messages.success(self.request, _('Thanks! We will be in touch!'))
        return super(CustomerServiceRequest, self).form_valid(form)
