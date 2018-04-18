from django.contrib.auth.mixins import AccessMixin
from django.core.urlresolvers import reverse

from .models import Project, Gallery


class IsProjectOwner(AccessMixin):

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_anonymous():
            return self.handle_no_permission()
        project_slug = kwargs.get('slug')
        if not project_slug:
            return self.handle_no_permission()
        project = Project.objects.filter(slug=project_slug).first()
        if not project:
            return self.handle_no_permission()
        if project.user.id != request.user.id:
            return self.handle_no_permission()
        return super(IsProjectOwner, self).dispatch(
            request, *args, **kwargs)

    def get_login_url(self):
        if not self.request.user.is_anonymous():
            return reverse('home')
        return super(IsProjectOwner, self).get_login_url()


class IsGalleryOwner(AccessMixin):

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_anonymous():
            return self.handle_no_permission()
        gallery_slug = kwargs.get('slug')
        if not gallery_slug:
            return self.handle_no_permission()
        gallery = Gallery.objects.filter(slug=gallery_slug).first()
        if not gallery:
            return self.handle_no_permission()
        if gallery.user.id != request.user.id:
            return self.handle_no_permission()
        return super(IsGalleryOwner, self).dispatch(
            request, *args, **kwargs)

    def get_login_url(self):
        if not self.request.user.is_anonymous():
            return reverse('home')
        return super(IsProjectOwner, self).get_login_url()
