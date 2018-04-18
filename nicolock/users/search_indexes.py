from haystack import indexes

from .models import CompanyProfile


class CompanyProfileIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=False)

    def get_model(self):
        return CompanyProfile

    def prepare_text(self, obj):
        user_name = obj.user.name if obj.user else ''
        return " ".join((
            obj.name, user_name, obj.contact_name, 
            obj.specialties, obj.description
        ))
