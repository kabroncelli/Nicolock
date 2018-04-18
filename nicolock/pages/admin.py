# -*- coding: utf-8 -*-
from django.contrib import admin
from django.contrib.flatpages.admin import FlatPageAdmin as BaseFlatPageAdmin
from django.contrib.flatpages.models import FlatPage as BaseFlatPage
from django.utils.translation import ugettext_lazy as _

from . import models

admin.site.unregister(BaseFlatPage)


@admin.register(models.Page)
class PageAdmin(BaseFlatPageAdmin):
    fieldsets = (
        (None, {'fields': (
            'url', 'title', 'main_content', 'sidebar_content', 'menu', 'sites',
            'published')
        }),
        (_('Advanced options'), {
            'classes': ('collapse', ),
            'fields': (
                'seo_keywords',
                'seo_title',
                'seo_description',
                'registration_required',
                'template_name',
            ),
        }),
    )
