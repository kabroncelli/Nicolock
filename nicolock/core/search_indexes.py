from haystack import indexes

from django.contrib.flatpages.models import FlatPage


class FlatPageIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)

    def get_model(self):
        return FlatPage

    def prepare_text(self, obj):
        return " ".join((
            obj.title, obj.content
        ))
