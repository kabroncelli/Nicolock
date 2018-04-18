# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-17 22:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import froala_editor.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('flatpages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Page',
            fields=[
                ('flatpage_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='flatpages.FlatPage')),
                ('main_content', froala_editor.fields.FroalaField(blank=True)),
                ('sidebar_content', froala_editor.fields.FroalaField(blank=True)),
                ('seo_keywords', models.CharField(blank=True, max_length=255)),
                ('seo_title', models.CharField(blank=True, help_text='Will default to the title if left blank', max_length=255)),
                ('seo_description', models.TextField(blank=True)),
            ],
            bases=('flatpages.flatpage',),
        ),
    ]