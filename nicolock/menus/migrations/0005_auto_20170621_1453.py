# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-21 14:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menus', '0004_auto_20170621_0014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='section',
            field=models.CharField(choices=[('section_one', 'Section One'), ('section_two', 'Section Two'), ('section_three', 'Section Three')], default='section_one', help_text='The section in which this menu will show (for the given url)', max_length=255, verbose_name='section'),
        ),
    ]
