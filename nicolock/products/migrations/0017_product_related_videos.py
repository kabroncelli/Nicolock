# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-08-17 22:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0006_auto_20170503_0318'),
        ('products', '0016_product_related_products'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='related_videos',
            field=models.ManyToManyField(blank=True, to='videos.Video'),
        ),
    ]
