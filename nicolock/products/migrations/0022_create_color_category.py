# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2018-01-03 17:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0021_category_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='ColorCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
            ],
            options={
                'verbose_name_plural': 'color categories',
            },
        ),
        migrations.AddField(
            model_name='color',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='colors', to='products.ColorCategory'),
        ),
    ]