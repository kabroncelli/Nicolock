# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.flatpages.models import FlatPage as BaseFlatPage

from froala_editor.fields import FroalaField


class Page(BaseFlatPage):
    main_content = FroalaField(blank=True)
    sidebar_content = FroalaField(blank=True)
    seo_keywords = models.CharField(blank=True, max_length=255)
    seo_title = models.CharField(
        blank=True, max_length=255,
        help_text="Will default to the title if left blank")
    seo_description = models.TextField(blank=True)
    menu = models.ForeignKey('menus.Menu', blank=True, null=True)
    published = models.BooleanField(default=False)

    @staticmethod
    def get_urls():
        pages = Page.objects.filter(published=True).order_by('url')
        return [page.get_absolute_url() for page in pages]
