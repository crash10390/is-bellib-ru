from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^books/add/$', AddBookView.as_view(), name='add_book'),
    url(r'^search/?$', SearchResult.as_view(), name='search_result'),
    url(r'^api/readers/$', ApiReadersView.as_view(), name='api_readers'),
    url(r'^api/bookinfo/(?P<pk>[\d-]+)/$', ApiBookInfoView.as_view(), name='api_bookinfo'),
    url(r'^api/bookorder/(?P<pk>[\d-]+)/$', ApiBookOrderView.as_view(), name='api_bookorder'),
    url(r'^api/issues/(?P<pk>[\d-]+)/$', ApiBookIssueView.as_view(), name='api_issued'),
    url(r'^api/bookback/(?P<pk>[\d-]+)/$', ApiBookBackView.as_view(), name='api_bookback'),
    url(r'^api/prolonged/(?P<pk>[\d-]+)/$', ApiBookProlongedView.as_view(), name='api_prolonged'),
    url(r'^api/cancellation/(?P<pk>[\d-]+)/$', ApiBookCancellationView.as_view(), name='api_cancellation'),

]
