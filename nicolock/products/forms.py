from django import forms

from .models import Image


class ProductImageForm(forms.Form):
    image = forms.IntegerField()

    def is_valid(self):
        valid = super(ProductImageForm, self).is_valid()
        if valid:
            self.image_object = Image.objects.filter(
                id=self.cleaned_data['image']).first()
        return valid
