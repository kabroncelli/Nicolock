from datetime import datetime
from django import template

register = template.Library()


@register.simple_tag(takes_context=True)
def define(context, key, value):
    context.dicts[0][key] = value
    return ''


@register.filter(name='addcss')
def addcss(field, css):
    return field.as_widget(attrs={"class": css})


@register.simple_tag(takes_context=False)
def field_attrs(field, **kwargs):
    return field.as_widget(attrs=kwargs)
