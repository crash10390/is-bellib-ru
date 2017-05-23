from django.conf.urls import url
from django.contrib import admin
from .views import *

urlpatterns = [
    url(r'^login/$', LoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
    url(r'^reminder/$', ReminderView.as_view(), name='reminder'),
    url(r'^reminder/success/$', ReminderSuccessView.as_view(), name='reminder_success'),
    url(r'^librarian/add/$', AddLibrarian.as_view(), name='add_librarian'),
    url(r'^reader/add/$', AddReader.as_view(), name='add_reader'),
    url(r'^profile/librarian/$', ProfileLibrarianView.as_view(), name='profile_librarian'),
    url(r'^profile/reader/(?P<pk>[\d-]+)/edit/$', ProfileReaderEditView.as_view(), name='profile_reader_edit'),
    url(r'^refresh/(?P<token>.+\/)/$', RefreshPasswordView.as_view(), name='refresh_password'),
    url(r'^profile/reader/$', ProfileReaderView.as_view(), name='profile_reader'),
    url(r'^api/reader/change_request/$', ChangeProfileRequestApiView.as_view(), name='change_request'),

]
