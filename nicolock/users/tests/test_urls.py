from django.core.urlresolvers import reverse, resolve

from test_plus.test import TestCase

from .factories import UserFactory


class TestUserURLs(TestCase):
    user_factory = UserFactory

    def setUp(self):
        self.user = self.make_user()

    def test_list_reverse(self):
        """users:list should reverse to /users/."""
        self.assertEqual(reverse('users:list'), '/users/')

    def test_list_resolve(self):
        """/users/ should resolve to users:list."""
        self.assertEqual(resolve('/users/').view_name, 'users:list')

    def test_redirect_reverse(self):
        """users:redirect should reverse to /users/~redirect/."""
        self.assertEqual(reverse('users:redirect'), '/users/~redirect/')

    def test_redirect_resolve(self):
        """/users/~redirect/ should resolve to users:redirect."""
        self.assertEqual(
            resolve('/users/~redirect/').view_name,
            'users:redirect'
        )

    def test_update_reverse(self):
        """users:update should reverse to /users/~update/."""
        self.assertEqual(reverse('users:update'), '/users/account/')

    def test_update_resolve(self):
        """/users/~update/ should resolve to users:update."""
        self.assertEqual(
            resolve('/users/account/').view_name,
            'users:update'
        )
