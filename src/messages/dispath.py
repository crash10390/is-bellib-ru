from django.dispatch import receiver
from accounts.signals import book_order_create, book_order_close
from accounts.models import User
from django.contrib.auth.models import Group
from .models import Message


@receiver(book_order_create)
def book_order_create_callback(sender, **kwargs):
    library = sender.reader.library
    librarians_group = Group.objects.get(name='Librarian')
    librarians = User.objects.filter(library=library, groups__contains=librarians_group)

    title = 'Поступила заявка от читателя %s (%s, %s).' % (
        sender.reader.get_short_name(), sender.reader.libary.name, sender.reader.library.city.town)

    text = ' Запрос книги: %s, из Библиотеки %s (%s)' % (
        sender.book.get_display_name(), sender.book.library.name, sender.book.library.city.town)
    for librarian in librarians:
        Message.objects.send_system_message(subject=title, message=text, recipient=librarian, type='book_order',
                                            context=str(sender.pk))
