# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse, reverse_lazy
from django.views.generic import DetailView, ListView, RedirectView, UpdateView, TemplateView
from django.views.generic.edit import FormView

from rest_framework.renderers import JSONRenderer

from .forms import ContractorSearchForm, SendEmailForm, UserUpdateForm
from .models import User, CompanyProfile
from .serializers import CompanyProfileMapSerializer
from nicolock.core.views import BaseSearchView
from nicolock.core.mixins import IsStaff
from nicolock.taskapp.celery import email_users


class FindContractors(TemplateView):
    template_name = 'users/contractor_list.html'


class ManageContractors(TemplateView):
    template_name = 'users/manage_contractors.html'


class SendUserEmails(IsStaff, FormView):
    template_name = 'users/send_email.html'
    form_class = SendEmailForm
    success_url = reverse_lazy('admin:users_user_changelist')

    def form_valid(self, form):
        users = form.cleaned_data['users']
        subject = form.cleaned_data['subject']
        message = form.cleaned_data['message']
        email_users.delay(users, subject, message)
        user_message = '{0} users emailed successfully!'.format(form.cleaned_data['users'].count())
        messages.success(self.request, user_message)
        return super(SendUserEmails, self).form_valid(form)


class UserRedirect(RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse('users:update')


class UserUpdate(LoginRequiredMixin, FormView):
    template_name = 'users/user_form.html'
    form_class = UserUpdateForm
    success_url = reverse_lazy('users:update')

    def form_valid(self, form):
        user = self.request.user 
        user.name = form.cleaned_data['name']
        user.email = form.cleaned_data['email']
        user.postal_code = form.cleaned_data['postal_code']
        new_password = form.cleaned_data.get('new_password')
        confirm_new_password = form.cleaned_data.get('confirm_new_password')
        if new_password != "" and (new_password == confirm_new_password):
            user.set_password(new_password)
            update_session_auth_hash(self.request, user)
        user.save()
        messages.success(self.request, 'Account updated successfully')
        return super(UserUpdate, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(UserUpdate, self).get_context_data(**kwargs)
        context['user'] = self.request.user
        return context


class UserList(ListView):
    model = User
    queryset = User.objects.filter(user_type='contractor')


class CompanyProfileUpdate(LoginRequiredMixin, UpdateView):
    fields = [
        'name', 'address', 'website', 'phone', 'email', 'contact_name',
        'contact_email', 'contact_phone', 'area_covered', 'specialties',
        'description'
    ]
    model = CompanyProfile

    def get_success_url(self):
        return reverse('users:update')

    def get_object(self):
        instance, created = CompanyProfile.objects.get_or_create(
            user=self.request.user)
        return instance


class CompanyProfileDetail(DetailView):
    model = CompanyProfile
