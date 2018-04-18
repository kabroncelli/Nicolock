from django import forms

from .models import Template
from nicolock.menus.models import Menu
from nicolock.core.utils import get_url_choices


class TemplateAdminForm(forms.ModelForm):

    class Meta:
        model = Template
        fields = '__all__'
        widgets = {
            'top_left_button_one_link': forms.Select(),
            'top_right_button_one_link': forms.Select(),
            'top_right_button_two_link': forms.Select(),
            'top_right_button_three_link': forms.Select(),
            'bottom_left_button_one_link': forms.Select(),
            'bottom_left_button_two_link': forms.Select(),
            'bottom_right_button_one_link': forms.Select(),
            'button_link': forms.Select(),
        }

    def __init__(self, *args, **kwargs):
        super(TemplateAdminForm, self).__init__(*args, **kwargs)
        url_choices = [('', '--Select One--')] + get_url_choices()
        self.fields['top_left_button_one_link'].widget.choices = url_choices
        self.fields['top_right_button_one_link'].widget.choices = url_choices
        self.fields['top_right_button_two_link'].widget.choices = url_choices
        self.fields['top_right_button_three_link'].widget.choices = url_choices
        self.fields['bottom_left_button_one_link'].widget.choices = url_choices
        self.fields['bottom_left_button_two_link'].widget.choices = url_choices
        self.fields['bottom_right_button_one_link'].widget.choices = url_choices
        self.fields['button_link'].widget.choices = url_choices
