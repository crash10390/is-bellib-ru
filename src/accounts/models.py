from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.mail import send_mail
from django.urls import reverse_lazy
from django.utils import timezone
import datetime
from elcat.models import library, book
from .managers import CustomUserManager, OrderBooksManager, UserReminderRequestManager
from .signals import book_order_close, book_order_create


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('username', max_length=150, unique=False)
    first_name = models.CharField('Имя', max_length=150, blank=True)
    middle_name = models.CharField('Отчество', max_length=150, blank=True)
    last_name = models.CharField('Фамилия', max_length=150, blank=True)
    email = models.EmailField('email address', blank=True, unique=True)
    is_staff = models.BooleanField('staff status', default=False)
    is_active = models.BooleanField('active', default=True, )
    date_joined = models.DateTimeField('date joined', default=timezone.now)
    edit_request = models.BooleanField('edit_request', default=False)
    self_number = models.CharField('self_number', max_length=150, blank=True)
    ticket_number = models.CharField('ticket_number', max_length=150, blank=True)
    phone = models.CharField('phone', max_length=150, blank=True)
    library = models.ForeignKey(library, verbose_name='library', blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        permissions = (
            ("add_librarian", "add_librarian"),
            ("add_book", "add_book"),
            ("cancellation_book", "cancellation_book"),
            ("add_reader", "add_reader"),
        )

    def __str__(self):
        return "%s %s %s" % (self.last_name, self.first_name, self.middle_name) if self.last_name != "" else self.email

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        if self.last_name != "" and self.middle_name != "" and self.first_name != "":
            return '%s %s.%s.' % (self.last_name, self.first_name[0], self.middle_name[0])
        return self.email

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_absolute_url(self):
        return reverse_lazy('accounts:profile_reader_edit', kwargs={'pk': self.pk})


class IssuedBooks(models.Model):
    start_date = models.DateField(default=timezone.now)
    book = models.ForeignKey(book, verbose_name='Книга')
    reader = models.ForeignKey(User, verbose_name='Читатель')
    prolong_request = models.BooleanField(verbose_name='Запрошено продление', default=False)

    def prolong(self, days=7):
        date = timezone.now()
        self.start_date = date + datetime.timedelta(days=days)
        self.save()


class BookOrder(models.Model):
    date_created = models.DateTimeField(verbose_name='Дата и время создания',
                                        default=timezone.now)
    reader = models.ForeignKey(User, verbose_name='Читатель')
    book = models.ForeignKey(book, verbose_name='книга')
    closed = models.BooleanField(verbose_name='Заказ закрыт', default=False)
    objects = OrderBooksManager()

    def close_order(self):
        self.closed = True
        self.save()
        book_order_close.send(self, book_order=self)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        send_signal = self.pk is None
        super(BookOrder, self).save(force_insert, force_update, using, update_fields)
        if send_signal:
            book_order_create.send(self, book_order=self)


class UserReminderRequest(models.Model):
    user = models.ForeignKey(User, verbose_name='Пользователь')
    token = models.CharField(verbose_name='Токен', max_length=150)
    created = models.DateTimeField(default=timezone.now)

    objects = UserReminderRequestManager()

    class Meta:
        verbose_name = 'Заброс на сброс пароля'
        verbose_name_plural = 'Запросы на срос пароля'

    def __str__(self):
        return '%s:%s' % (self.user.get_short_name(), self.created)

    def get_absolute_url(self):
        return reverse_lazy('accounts:refresh_password', kwargs={'token': self.token})
