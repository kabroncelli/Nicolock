# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-03 00:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0002_auto_20161220_1747'),
    ]

    operations = [
        migrations.CreateModel(
            name='InspirationalPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('brief_description', models.TextField(blank=True, verbose_name='brief description')),
                ('long_description', models.TextField(blank=True, verbose_name='long description')),
                ('list_image', models.ImageField(upload_to='inspirational_photo_images', verbose_name='list image')),
                ('detail_image', models.ImageField(upload_to='inspirational_photo_images', verbose_name='detail image')),
                ('slug', models.SlugField(blank=True, max_length=255, unique=True)),
            ],
        ),
    ]