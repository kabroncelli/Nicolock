# -*- coding: utf-8 -*-
from django import forms
from django.utils.translation import ugettext_lazy as _

from .models import User, CompanyProfile


class SignupForm(forms.Form):
    """
    Django allauth automatically makes this form inherit from
    allauth.account.forms.SignupForm to prevent a circular import. I only need
    to add additional fields. Email and password will be taken care of.
    """
    name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('Name')}))
    postal_code = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('Zipcode')}))
    user_type = forms.ChoiceField(
        choices=User.USER_TYPES, widget=forms.RadioSelect)

    field_order = [
        'user_type',
        'name',
        'email',
        'password',
        'postal_code'
    ]

    def signup(self, request, user):
        user.postal_code = self.cleaned_data['postal_code']
        user.user_type = self.cleaned_data['user_type']
        user.email = self.cleaned_data['email'].lower()
        user.save()


class ContractorSearchForm(forms.Form):
    postal_code = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('Zipcode')}))

    def search(self, cleaned_data):
        profiles = CompanyProfile.objects.filter(
            user__user_type='contractor', 
            user__postal_code=cleaned_data['postal_code'])
        return profiles.exclude(
            longitude__isnull=True, 
            latitude__isnull=True)


class SendEmailForm(forms.Form):
    subject = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('Subject')}))
    message = forms.CharField(widget=forms.Textarea)
    users = forms.ModelMultipleChoiceField(label="To",
                                           queryset=User.objects.all(),
                                           widget=forms.SelectMultiple())


class UserUpdateForm(forms.Form):
    name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('Name')}))
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'placeholder': _('Email')}))
    postal_code = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': _('Zipcode')}))
    new_password = forms.CharField(
        required=False,
        widget=forms.PasswordInput(attrs={'placeholder': _('Zipcode')}))
    confirm_new_password = forms.CharField(
        required=False,
        widget=forms.PasswordInput(attrs={'placeholder': _('Zipcode')}))
