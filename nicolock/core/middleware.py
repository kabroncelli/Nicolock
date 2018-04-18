from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import resolve, reverse
from django.utils.deprecation import MiddlewareMixin


class LoginRequiredMiddleware(MiddlewareMixin):

    def process_view(self, request, view_func, view_args, view_kwargs):
        if not getattr(view_func, 'login_required', True):
            return None
        if resolve(request.path).view_name == 'admin:login':
            return None
        return login_required(view_func)(request, *view_args, **view_kwargs)
