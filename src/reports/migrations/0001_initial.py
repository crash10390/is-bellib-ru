# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-12 21:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Название отчета', max_length=150, verbose_name='Название')),
                ('query', models.TextField(verbose_name='Запрос')),
                ('note', models.TextField(blank=True, verbose_name='Описание')),
            ],
            options={
                'verbose_name': 'Отчет',
                'verbose_name_plural': 'Отчеты',
                'permissions': (('add_query', 'add_query'), ('exec_query', 'exec_query')),
            },
        ),
    ]