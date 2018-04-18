# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-27 22:01
from __future__ import unicode_literals

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_companyprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='slug',
            field=autoslug.fields.AutoSlugField(blank=True, editable=False, null=True, populate_from='name', unique=True),
        ),
    ]
