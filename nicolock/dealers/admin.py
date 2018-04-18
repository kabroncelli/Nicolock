# -*- coding: utf-8 -*-
from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from . import models


class DealerResource(resources.ModelResource):
    class Meta:
        model = models.Dealer
        exclude = ('lat', 'lng',)


@admin.register(models.Dealer)
class DealerAdmin(ImportExportActionModelAdmin):
    resource_class = DealerResource
    exclude = ('lat', 'lng',)
    list_display = ('name', 'postal_code',)
    search_fields = ('postal_code',)
