from django.contrib import admin

from . import models


@admin.register(models.Innovation)
class InnovationAdmin(admin.ModelAdmin):
    pass
