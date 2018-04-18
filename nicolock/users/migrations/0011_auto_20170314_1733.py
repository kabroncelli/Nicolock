# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-03-14 17:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20170105_2254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='contact_phone',
            field=models.CharField(blank=True, max_length=16, verbose_name='contact phone number'),
        ),
        migrations.AlterField(
            model_name='companyprofile',
            name='phone',
            field=models.CharField(blank=True, max_length=16, verbose_name='company phone number'),
        ),
    ]