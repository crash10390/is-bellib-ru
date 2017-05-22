from django.db import models


class Document(models.Model):
    name = models.CharField(verbose_name='Название', max_length=250)
    slug = models.CharField(verbose_name='Ссылка', max_length=250)
    file = models.FileField(verbose_name='Файл', upload_to='docs/')
