from django.db import models
from django.core.urlresolvers import reverse_lazy


class Report(models.Model):
    name = models.CharField(verbose_name='Название', max_length=150, help_text='Название отчета')
    query = models.TextField(verbose_name='Запрос', )
    note = models.TextField(verbose_name='Описание', blank=True)

    class Meta:
        verbose_name = 'Отчет'
        verbose_name_plural = 'Отчеты'
        permissions = (
            ("add_query", "add_query"),
            ("exec_query", "exec_query"),
        )

    def __str__(self):
        return self.name

    def get_exec_url(self):
        return reverse_lazy('reports:exec', kwargs={'pk': self.pk})
