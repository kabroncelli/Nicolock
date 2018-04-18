from django import forms


class ListTextWidget(forms.TextInput):

    def render(self, name, value, attrs=None):
        attrs = attrs or {}
        attrs.update({'list': 'pages'})
        text_html = super(ListTextWidget, self).render(name, value, attrs=attrs)
        return text_html
