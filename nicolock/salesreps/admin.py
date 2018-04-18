from django.contrib import admin

from . import models


@admin.register(models.SalesRep)
class SalesRepAdmin(admin.ModelAdmin):
    filter_horizontal = ('postal_codes',)


@admin.register(models.PostalCode)
class PostalCodeAdmin(admin.ModelAdmin):
    readonly_fields = ('lat', 'lng',)
