# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-27 15:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_auto_20170517_1918'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='companyprofile',
            name='user',
        ),
        migrations.DeleteModel(
            name='CompanyProfile',
        ),
    ]
