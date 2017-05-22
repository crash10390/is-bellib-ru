# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-11 12:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20170428_1802'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'permissions': (('add_librarian', 'Регистрация библиотекаря'), ('add_book', 'Добавление книги'), ('cancellation_book', 'Списание книги'), ('add_reader', 'Регистрация читателя')), 'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first_name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=150, verbose_name='username'),
        ),
    ]
