# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-21 20:52
from __future__ import unicode_literals

from django.db import migrations, models
import nicolock.menus.validators


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0005_auto_20170621_1453'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='basemenuitem',
            options={'ordering': ['order']},
        ),
        migrations.AddField(
            model_name='basemenuitem',
            name='order',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='basemenuitem',
            name='url',
            field=models.CharField(blank=True, help_text="Example: '/about/contact/'. Make sure to have leading and trailing slashes.", max_length=255, validators=[nicolock.menus.validators.validate_slashes], verbose_name='url'),
        ),
    ]
