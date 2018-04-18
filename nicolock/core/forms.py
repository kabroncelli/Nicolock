from django import forms

from haystack.query import SearchQuerySet
from haystack.inputs import AutoQuery

from nicolock.products.models import Product, Color


class SearchForm(forms.Form):
    q = forms.CharField(required=False)

    def search(self, cleaned_data):
        return SearchQuerySet().filter(
            content=AutoQuery(cleaned_data['q']))


class QuoteForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()
    phone = forms.CharField()
    address = forms.CharField()
    city = forms.CharField()
    state = forms.CharField()
    postal_code = forms.CharField()
    project_type = forms.CharField()
    description = forms.CharField(widget=forms.Textarea)


class ContactForm(forms.Form):
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()
    phone = forms.CharField()
    state = forms.CharField()
    postal_code = forms.CharField()
    subject = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)


class CustomerServiceRequestForm(forms.Form):
    install_date = forms.DateField(required=True)
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    address = forms.CharField(required=True)
    address2 = forms.CharField(required=False)
    city = forms.CharField(required=True)
    state = forms.CharField(required=True)
    postal_code = forms.CharField(required=True)
    phone = forms.CharField(required=True)
    email = forms.EmailField(required=True)

    pi_product = forms.ModelChoiceField(
        queryset=Product.objects.all(), empty_label="--Select--",
        required=False)
    pi_colors = forms.ModelChoiceField(
        queryset=Color.objects.all(), empty_label="--Select--",
        required=False)
    pi_square_feet = forms.CharField(required=False)
    pi_describe = forms.CharField(widget=forms.Textarea, required=False)
    pi_image1 = forms.ImageField(required=False)
    pi_image2 = forms.ImageField(required=False)
    pi_image3 = forms.ImageField(required=False)

    # ii_installed
    ii_purchased = forms.CharField(required=False)
    ii_name = forms.CharField(required=False)
    ii_address = forms.CharField(required=False)
    ii_address2 = forms.CharField(required=False)
    ii_city = forms.CharField(required=False)
    ii_state = forms.CharField(required=False)
    ii_postal_code = forms.CharField(required=False)
    ii_phone = forms.CharField(required=False)
    ii_cell = forms.CharField(required=False)
    ii_email = forms.EmailField(required=False)
