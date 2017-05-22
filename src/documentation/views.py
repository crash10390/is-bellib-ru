from django.views.generic import ListView
from .models import Document

class DocsList(ListView):
    template_name = "docs_list.html"
    model = Document
    context_object_name = "documents"
