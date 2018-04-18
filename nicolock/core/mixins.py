# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.core.urlresolvers import reverse
from django.contrib.auth.mixins import AccessMixin, UserPassesTestMixin

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication

from .authentication import CsrfExemptSessionAuthentication


class IsStaff(UserPassesTestMixin):

    def test_func(self):
        if self.request.user.is_anonymous():
            return False
        return self.request.user.is_staff


class IsContractor(AccessMixin):
    """
    View mixin which verifies that the user is authenticated.

    NOTE:
        This should be the left-most mixin of a view, except when
        combined with CsrfExemptMixin - which in that case should
        be the left-most mixin.
    """
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated():
            return self.handle_no_permission()

        if not request.user.user_type == 'contractor':
            return self.handle_no_permission()

        return super(IsContractor, self).dispatch(
            request, *args, **kwargs)

    def get_login_url(self):
        if not self.request.user.is_anonymous():
            return reverse('home')
        return super(IsContractor, self).get_login_url()


class IsAuthorized:
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)


class AllowAny:
    permission_classes = (AllowAny, )
    authentication_classes = (CsrfExemptSessionAuthentication, )
