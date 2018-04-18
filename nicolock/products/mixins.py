from django.views.decorators.clickjacking import xframe_options_exempt


class AllowEmbedMixin(object):
    @classmethod
    def as_view(cls, **initkwargs):
        view = super(AllowEmbedMixin, cls).as_view(**initkwargs)
        return xframe_options_exempt(view)