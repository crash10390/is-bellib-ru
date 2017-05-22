import django.dispatch

book_order_create = django.dispatch.Signal(providing_args=["book_order", ])
book_order_close = django.dispatch.Signal(providing_args=["book_order", ])
