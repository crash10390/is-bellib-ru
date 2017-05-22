from django import forms
from .models import book


class AddBookForm(forms.ModelForm):
    class Meta:
        model = book
        exclude = ["book_id", "isdeleted", "bookauthor_id", "librarytown"]
