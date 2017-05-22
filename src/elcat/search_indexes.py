import datetime
from haystack import indexes
from .models import book


class BookIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    author_id = indexes.MultiValueField(null=True)
    inventory = indexes.IntegerField(model_attr='inventory', null=True)
    isbn = indexes.CharField(model_attr='isbn', null=True)

    def get_model(self):
        return book

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(isdeleted=False)

    def prepare_author_id(self, obj):
        return [author.name for author in obj.author_id.all()]
