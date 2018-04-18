from django.contrib import admin

from . import models


@admin.register(models.DesignIdea)
class DesignIdeaAdmin(admin.ModelAdmin):
    pass
