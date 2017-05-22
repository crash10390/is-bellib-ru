from django.conf.urls import url
from .views import DocsList

urlpatterns = [
    url(r'^list/$', DocsList.as_view(), name='list'),

]
