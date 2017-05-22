from django.conf.urls import url, include
from django.contrib import admin
from .views import HomeView

urlpatterns = [
    url(r'^$', HomeView.as_view()),
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^elcat/', include('elcat.urls', namespace='elcat')),
    url(r'^reports/', include('reports.urls', namespace='reports')),
    url(r'^doc/', include('documentation.urls', namespace='docs')),
]
