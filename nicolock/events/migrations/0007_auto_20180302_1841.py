# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-03-02 18:41
from __future__ import unicode_literals

from django.db import migrations
import froala_editor.fields


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_event_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='description',
            field=froala_editor.fields.FroalaField(blank=True, verbose_name='description'),
        ),
    ]
