from django.contrib import admin

from . import models



@admin.register(models.Item)
class ItemAdmin(admin.ModelAdmin):
    pass


class ItemInline(admin.TabularInline):
    model = models.Item
    extra = 0


@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Gallery)
class GalleryAdmin(admin.ModelAdmin):
    raw_id_fields = ('user',)
    inlines = (ItemInline,)
    list_display = ('name', 'user', 'project', 'slug',)


@admin.register(models.InspirationalPhoto)
class InspirationalPhotoAdmin(admin.ModelAdmin):
    pass