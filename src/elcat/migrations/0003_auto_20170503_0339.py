# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-03 03:39
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('elcat', '0002_auto_20170502_1915'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='text',
            new_name='name',
        ),
    ]
