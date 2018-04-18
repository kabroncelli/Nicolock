from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple

from .models import ChildItem, Item, Menu
from .widgets import ListTextWidget


class ItemForm(forms.ModelForm):

    class Meta:
        model = Item
        fields = '__all__'
        widgets = {
            'url': ListTextWidget()
        }


class ChildItemForm(forms.ModelForm):

    class Meta:
        model = ChildItem
        fields = '__all__'
        widgets = {
            'url': ListTextWidget()
        }


class MenuForm(forms.ModelForm):

    class Meta:
        model = Menu
        fields = '__all__'
        widgets = {
            'url': FilteredSelectMultiple('urls', is_stacked=False)
        }
