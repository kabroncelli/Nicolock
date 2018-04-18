# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-10-09 19:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0018_accessory'),
    ]

    operations = [
        migrations.CreateModel(
            name='Countertop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('description', models.TextField(blank=True, verbose_name='description')),
                ('original', models.ImageField(upload_to='product_countertops', verbose_name='image')),
                ('order', models.PositiveIntegerField(default=1, help_text='Will fall back to the last time saved', verbose_name='order')),
                ('modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='countertops', to='products.Product')),
            ],
            options={
                'verbose_name': 'countertop',
                'verbose_name_plural': 'countertops',
                'ordering': ['order', 'modified'],
            },
        ),
    ]