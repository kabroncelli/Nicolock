# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-03 03:09
from __future__ import unicode_literals

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('design', '0003_auto_20170426_1703'),
    ]

    operations = [
        migrations.AlterField(
            model_name='designidea',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='slug', editable=False, populate_from='name', unique=True),
            preserve_default=False,
        ),
    ]
