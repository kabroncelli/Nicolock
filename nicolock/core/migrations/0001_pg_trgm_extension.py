# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-21 16:49
from __future__ import unicode_literals

from django.contrib.postgres.operations import TrigramExtension
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        TrigramExtension()
    ]
