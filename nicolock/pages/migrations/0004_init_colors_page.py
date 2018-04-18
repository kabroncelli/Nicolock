# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-01-03 18:10
from __future__ import unicode_literals

from django.db import migrations

def create_color_page(apps, schema_editor):
    Page = apps.get_model('pages', 'Page')
    page, _ = Page.objects.get_or_create(
        url='/colors/',
        title='Colors',
        template_name='flatpages/color_category_list.html',
        published=True)
    page.sites.add(1)


def reverse_migration(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0003_set_site_domain_and_name'),
        ('pages', '0003_page_published'),
    ]

    operations = [
        migrations.RunPython(create_color_page, reverse_migration),
    ]
