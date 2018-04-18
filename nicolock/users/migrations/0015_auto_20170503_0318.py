# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-03 03:18
from __future__ import unicode_literals

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_auto_20170426_2234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='slug', editable=False, populate_from='user__name', unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='slug', editable=False, populate_from='name', unique=True),
            preserve_default=False,
        ),
    ]
