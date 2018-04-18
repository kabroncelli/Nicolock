import tempfile

from django.core.urlresolvers import reverse
from django.test import TestCase

from rest_framework import status

from ..models import DesignIdea
from nicolock.users.models import User


class DesignIdeas(TestCase):

    def setUp(self):
        user = User(
            email='test@test.com', name='Test Guy', postal_code=84321,
            user_type='homeowner')
        user.set_password('meo12345')
        user.save()
        self.user = user
        image = tempfile.NamedTemporaryFile(suffix=".jpg").name
        self.designidea = DesignIdea.objects.create(
            name='Idea',
            image=image
        )

    def login(self):
        self.client.login(email=self.user.email, password='meo12345')

    def test_image_library_redirect_404(self):
        # Make sure there are no design ideas in the db
        DesignIdea.objects.all().delete()
        self.login()
        res = self.client.get(reverse('design:redirect'))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_image_library_redirect(self):
        self.login()
        res = self.client.get(reverse('design:redirect'))
        self.assertEqual(res.status_code, status.HTTP_302_FOUND)
