# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-21 22:09
from __future__ import unicode_literals

from django.db import migrations, models

from nicolock.core.utils import slugify_lower


def create_slugs(apps, schema_editor):
    CompanyProfile = apps.get_model('users', 'CompanyProfile')
    for profile in CompanyProfile.objects.all():
        profile.slug = slugify_lower(profile.user.slug)
        profile.save()

def reverse_migration(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_user_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='companyprofile',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.RunPython(
            create_slugs,
            reverse_migration
        ),
    ]