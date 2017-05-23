from django.contrib import admin
from .models import User, UserReminderRequest

admin.site.register(User)
admin.site.register(UserReminderRequest)
