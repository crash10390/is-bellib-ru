from django.contrib.auth.models import UserManager
from django.contrib.auth.models import Group
from django.db import models
from .utils import rand_string


class CustomUserManager(UserManager):
    def register_librarian(self, data):
        user = self.model()
        user.username = data['email']
        user.first_name = data['first_name']
        user.middle_name = data['middle_name']
        user.last_name = data['last_name']
        user.email = data['email']
        user.self_number = data['self_number']
        user.ticket_number = data['ticket_number']
        user.library = data['library']

        user.phone = data['phone']
        user.set_password(data['password'])
        try:
            user.save()
            user.groups.add(Group.objects.get(name='librarian'))
            user.save()
        except:
            return None
        return user

    def register_reader(self, data):
        user = self.model()
        user.username = data['email']
        user.first_name = data['first_name']
        user.middle_name = data['middle_name']
        user.last_name = data['last_name']
        user.email = data['email']
        user.ticket_number = data['ticket_number']
        user.phone = data['phone']
        user.library = data['library']
        user.set_password(data['password'])
        try:
            user.save()
        except:
            return None
        return user


class OrderBooksManager(models.Manager):
    def get_order_for_book(self, book):
        return self.filter(book=book).filter(closed=False)


class UserReminderRequestManager(models.Manager):
    def generate_new(self, user):
        request = self.model()
        request.user = user
        request.token = rand_string()
        request.save()
        return  request
