from django.contrib import admin
from nested_admin import NestedStackedInline, NestedModelAdmin

from . import models
from . import forms
from nicolock.core.utils import get_url_list


class ChildItemInline(NestedStackedInline):
    model = models.ChildItem
    form = forms.ChildItemForm
    fk_name = 'parent'
    extra = 0


class ItemInline(NestedStackedInline):
    model = models.Item
    form = forms.ItemForm
    extra = 0
    inlines = [ChildItemInline]


@admin.register(models.Menu)
class MenuAdmin(NestedModelAdmin):
    extra = 0
    form = forms.MenuForm
    inlines = [ItemInline]

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['urls'] = get_url_list()
        return super(MenuAdmin, self).change_view(
            request, object_id, form_url, extra_context=extra_context
        )

    def add_view(self, request, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['urls'] = get_url_list()
        return super(MenuAdmin, self).add_view(
            request, form_url, extra_context=extra_context
        )
