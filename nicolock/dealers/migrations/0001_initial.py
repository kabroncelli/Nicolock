# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-15 17:46
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dealer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('address', models.TextField(verbose_name='address')),
                ('city', models.CharField(max_length=255, verbose_name='city')),
                ('state', models.CharField(max_length=55, verbose_name='state')),
                ('postal_code', models.CharField(max_length=12, verbose_name='postal code')),
                ('phone', models.CharField(max_length=16, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')], verbose_name='phone')),
            ],
        ),
    ]
