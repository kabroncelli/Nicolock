# -*- coding: utf-8 -*-
from django.contrib import admin
from django.conf import settings
from django.utils.safestring import mark_safe

from . import models


class ProductInline(admin.TabularInline):
    model = models.Product
    fields = ('name', 'order')
    extra = 0


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ('slug',)
    inlines = (ProductInline,)


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    pass


class ImageInline(admin.TabularInline):
    model = models.Image
    extra = 0


@admin.register(models.Accessory)
class AccessoryAdmin(admin.ModelAdmin):
    pass


class AccessoryInline(admin.TabularInline):
    model = models.Accessory
    extra = 0


@admin.register(models.Countertop)
class CountertopAdmin(admin.ModelAdmin):
    pass


class CountertopInline(admin.TabularInline):
    model = models.Countertop
    extra = 0


@admin.register(models.Spec)
class SpecAdmin(admin.ModelAdmin):
    pass


class SpecInline(admin.TabularInline):
    model = models.Spec
    extra = 0


@admin.register(models.Pattern)
class PatternAdmin(admin.ModelAdmin):
    pass


class PatternInline(admin.TabularInline):
    model = models.Pattern
    extra = 0


@admin.register(models.Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'category__name', 'product__name')
    list_filter = ('category', 'product')
    search_fields = ('name', 'category__name', 'product__name')

    def category__name(self, obj):
        if obj.category:
            return obj.category.name
        return '-No category-'
    category__name.short_description = 'Category name'

    def product__name(self, obj):
        if obj.product:
            return obj.product.name
        return '-No product-'
    product__name.short_description = 'Product name'


@admin.register(models.ColorCategory)
class ColorCategoryAdmin(admin.ModelAdmin):
    pass


class ColorInline(admin.TabularInline):
    model = models.Color
    extra = 0


@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    pass


class FileInline(admin.TabularInline):
    model = models.File
    extra = 0


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ('name', 'category__name',)
    inlines = [
        ImageInline,
        SpecInline,
        PatternInline,
        AccessoryInline,
        ColorInline,
        CountertopInline,
        FileInline
    ]
    list_display = ('name', 'embed_code', 'category',)
    ordering = ('-category',)
    list_filter = ('category',)
    filter_horizontal = ('related_products', 'related_videos',)

    def embed_code(self, obj):
        return obj.get_embed_code()
