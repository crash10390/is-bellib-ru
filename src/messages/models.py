from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from accounts.signals import book_order_create, book_order_close
from accounts.models import User
from django.contrib.auth.models import Group
from .managers import MessagesManager

MESSAGE_TYPES = (
    ('book_order', 'Заказ книги'),
    ('book_received', 'Выдача книги'),
    ('profile_change', 'Редактирование профиля'),
)


class Message(models.Model):
    type = models.CharField(verbose_name='Тип сообщения', max_length=80, choices=MESSAGE_TYPES)
    author = models.ForeignKey(User, verbose_name='Автор', blank=True, null=True, related_name='author')
    recipient = models.ForeignKey(User, verbose_name='Получатель', related_name='recipient')
    date_create = models.DateTimeField(auto_now_add=timezone.now, verbose_name='Создано')
    subject = models.CharField(verbose_name='Тема', max_length=150)
    text = models.TextField(verbose_name='Текст')
    url = models.URLField(verbose_name='Ссылка', blank=True)
    is_read = models.BooleanField(verbose_name='Прочитано', default=False)
    system_context = models.CharField(verbose_name='Системный контекст', max_length=150, blank=True)
    objects = MessagesManager()

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'

    def __str__(self):
        return self.subject


@receiver(book_order_create)
def book_order_create_callback(sender, **kwargs):
    library = sender.reader.library
    librarians_group = Group.objects.get(name='Librarian')
    librarians = librarians_group.user_set.all().filter(library=library)

    title = 'Поступила заявка от читателя %s (%s, %s).' % (
        sender.reader.get_short_name(), sender.reader.library.name, sender.reader.library.city.town)

    text = ' Запрос книги: %s, из Библиотеки %s (%s)' % (
        sender.book.get_display_name(), sender.book.library.name, sender.book.library.city.town)
    for librarian in librarians:
        Message.objects.send_system_message(subject=title, message=text, recipient=librarian, type='book_order',
                                            context=str(sender.pk))
