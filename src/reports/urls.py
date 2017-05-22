from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^reports/list/$', ListReports.as_view(), name='list'),
    url(r'^reports/(?P<pk>[\d-]+)/exec/$', ExecReport.as_view(), name='exec'),


]
