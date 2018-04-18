from haystack import indexes

from .models import Product, Image, Spec


class ProductIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)
    image = indexes.CharField(indexed=False, stored=True)

    def get_model(self):
        return Product

    def prepare_text(self, obj):
        uses = " ".join(obj.uses)
        return " ".join((
            obj.name, obj.description, uses
        ))

    def prepare_image(self, obj):
        image = obj.images.all().first()
        if image:
            return image.thumbnail.url
        return ''


class ImageIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)
    image = indexes.CharField(indexed=False, stored=True)

    def get_model(self):
        return Image

    def prepare_text(self, obj):
        return " ".join((
            obj.name, obj.description
        ))

    def prepare_image(self, obj):
        return obj.thumbnail.url


class SpecIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)

    def get_model(self):
        return Spec

    def prepare_text(self, obj):
        return obj.label
