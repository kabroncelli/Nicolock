# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-13 20:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BaseMenuItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255, verbose_name='name')),
                ('url', models.CharField(max_length=255, verbose_name='url')),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
            ],
        ),
        migrations.CreateModel(
            name='ChildItem',
            fields=[
                ('basemenuitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='menus.BaseMenuItem')),
            ],
            bases=('menus.basemenuitem',),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('basemenuitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='menus.BaseMenuItem')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='menus.Menu')),
            ],
            bases=('menus.basemenuitem',),
        ),
        migrations.AddField(
            model_name='childitem',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='child_items', to='menus.Item'),
        ),
    ]
