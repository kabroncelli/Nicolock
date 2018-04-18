from django import template

from ..models import ColorCategory

register = template.Library()


@register.inclusion_tag('products/includes/color_category_list.html')
def color_category_list(*args, **kwargs):
    return {
        'color_categories': ColorCategory.objects.all()
    }
