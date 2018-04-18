from haystack import indexes

from .models import Dealer


class DealerIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)

    def get_model(self):
        return Dealer

    def prepare_text(self, obj):
        return " ".join((
            obj.name, obj.city, obj.state, obj.postal_code
        ))
