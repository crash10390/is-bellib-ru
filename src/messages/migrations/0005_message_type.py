# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-05-20 14:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messages', '0004_auto_20170519_2056'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='type',
            field=models.CharField(choices=[('book_order', 'Заказ книги'), ('book_received', 'Выдача книги'), ('profile_change', 'Редактирование профиля')], default='old', max_length=80, verbose_name='Тип сообщения'),
            preserve_default=False,
        ),
    ]
