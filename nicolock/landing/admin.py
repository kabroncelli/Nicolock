from django.contrib import admin
from django.template.loader import render_to_string

from . import models
from .forms import TemplateAdminForm


@admin.register(models.LandingPage)
class LandingPageAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Template)
class TemplateAdmin(admin.ModelAdmin):
    form = TemplateAdminForm
    readonly_fields = ('examples',)
    fieldsets = (
        (None, {'fields': ('name', 'type', 'examples')}),
        ('Top Left', {'fields': ('top_left_button_one_label',
                                 'top_left_button_one_link',
                                 'top_left_background_one_image')}),
        ('Top Right', {'fields': ('top_right_button_one_label',
                                  'top_right_button_one_link',
                                  'top_right_background_one_image',
                                  'top_right_button_two_label',
                                  'top_right_button_two_link',
                                  'top_right_background_two_image',
                                  'top_right_button_three_label',
                                  'top_right_button_three_link',
                                  'top_right_background_three_image',
                                  'top_right_sidebar_title',
                                  'top_right_sidebar_text')}),
        ('Bottom Left', {'fields': ('bottom_left_button_one_label',
                                    'bottom_left_button_one_link',
                                    'bottom_left_background_one_image',
                                    'bottom_left_button_two_label',
                                    'bottom_left_button_two_link',
                                    'bottom_left_background_two_image')}),
        ('Bottom Right', {'fields': ('bottom_right_button_one_label',
                                     'bottom_right_button_one_link',
                                     'bottom_right_background_one_image')}),
        ('Button Page', {'fields': ('button_label',
                                    'button_description',
                                    'button_link',
                                    'button_page_background_image')}),
    )

    def examples(self, instance):
        return render_to_string('landing/partials/examples.html')

    examples.allow_tags = True
