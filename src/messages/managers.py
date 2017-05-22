from django.db import models


class MessagesManager(models.Manager):
    def get_inbox(self, user):
        return self.filter(recipient=user)

    def get_unread(self, user):
        return self.get_inbox(user).filter(is_read=False)

    def send_message(self, author, recipient, subject, message, url=""):
        direct_message = self.model(author=author, recipient=recipient, subject=subject, text=message, url=url)
        direct_message.save()
        return direct_message

    def send_system_message(self, recipient, subject, message, type="", context="", url=""):
        direct_message = self.model(recipient=recipient, subject=subject, type=type, text=message, url=url,
                                    system_context=context)
        direct_message.save()
        return direct_message
