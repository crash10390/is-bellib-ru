from django.contrib import admin
from .models import User, UserReminderRequest, BookOrder, IssuedBooks

admin.site.register(User)
admin.site.register(UserReminderRequest)
admin.site.register(BookOrder)
admin.site.register(IssuedBooks)
