# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-23 19:55
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_auto_20170523_1515'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bookorder',
            options={'verbose_name': 'Заказ на межбиблиотечный обмен', 'verbose_name_plural': 'Заказы на межбиблиотечный обмен'},
        ),
        migrations.AlterModelOptions(
            name='issuedbooks',
            options={'verbose_name': 'Выданная книга', 'verbose_name_plural': 'Выданные книги'},
        ),
    ]
