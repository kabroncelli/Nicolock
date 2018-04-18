# -*- coding: utf-8 -*-
from django.db import models
from django.core.urlresolvers import reverse
from django.db.models.signals import pre_save
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _
from django.utils.functional import lazy

from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill
from multiselectfield import MultiSelectField

from .validators import validate_slashes
from nicolock.core.utils import slugify_lower


class Menu(models.Model):
    SECTIONS = [
        ('section_one', 'Section One'),
        ('section_two', 'Section Two'),
        ('section_three', 'Section Three'),
    ]

    name = models.CharField(_('name'), max_length=255)
    url = MultiSelectField(
        _('url'), max_length=255, choices=[],
        help_text="This url will be the page that this menu shows up on.",
        validators=[validate_slashes])
    section = models.CharField(
        _('section'), max_length=255,
        help_text="The section in which this menu will show (for the given url)",
        choices=SECTIONS,
        default='section_one')

    def __init__(self, *args, **kwargs):
        super(Menu, self).__init__(*args, **kwargs)
        self._meta.get_field('url').choices = lazy(Menu.url_choices, list)()

    def __str__(self):
        return self.name

    def __iter__(self):
        return self.items.iterator()

    @classmethod
    def get_default_urls(clss):
        return [
            # '/',
            '/contractor/',
            '/contractors/',
            '/commercial/',
            '/dealers/',
            '/design-ideas/',
            '/faqs/',
            '/innovation/',
            '/inspiration/',
            '/image-library/',
            '/products/',
            '/salesreps/',
            '/search/',
            '/quote/',
            '/videos/'
        ]

    @classmethod
    def url_choices(clss):
        from nicolock.pages.models import Page
        urls = clss.get_default_urls()
        urls += Page.get_urls()
        return [(url, url) for url in urls]


class BaseMenuItem(models.Model):
    label = models.CharField(_('name'), max_length=255)
    url = models.CharField(
        _('url'), max_length=255, blank=True,
        help_text="Example: '/about/contact/'. Make sure to have leading and trailing slashes.",
        validators=[validate_slashes])
    order = models.FloatField(blank=True, null=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


class Item(BaseMenuItem):
    menu = models.ForeignKey(Menu, related_name='items')

    def __iter__(self):
        return self.child_items.iterator()

    @cached_property
    def has_children(self):
        return self.child_items.exists()


class ChildItem(BaseMenuItem):
    parent = models.ForeignKey(Item, related_name='child_items')
