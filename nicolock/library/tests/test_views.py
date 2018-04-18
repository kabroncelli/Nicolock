from django.core.urlresolvers import reverse
from django.test import TestCase

from rest_framework import status

from nicolock.users.models import User


class ImageLibrary(TestCase):

    def setUp(self):
        user = User(
            email='test@test.com', name='Test Guy', postal_code=84321,
            user_type='homeowner')
        user.set_password('meo12345')
        user.save()
        self.user = user

    def login(self):
        self.client.login(email=self.user.email, password='meo12345')

    def test_image_library_list_view_renders_correctly(self):
        self.login()
        res = self.client.get(reverse('library:list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
