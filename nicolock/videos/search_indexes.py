from haystack import indexes

from .models import Video


class VideoIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)

    def get_model(self):
        return Video

    def prepare_text(self, obj):
        if obj.description:
            description = obj.description
        else:
            description = ''
        return " ".join((
            obj.name, obj.description, obj.tag_text
        ))
