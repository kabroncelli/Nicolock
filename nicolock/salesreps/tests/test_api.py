import pathlib

from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.urlresolvers import reverse

from rest_framework import status
from rest_framework.test import APIClient

from ..models import PostalCode, SalesRep
from nicolock.users.models import User


class TestApi(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.postal_code_one = PostalCode.objects.create(
            postal_code='84321')
        self.postal_code_two = PostalCode.objects.create(
            postal_code='84326')
        current_dir = str(pathlib.Path(__file__).parent)
        image = SimpleUploadedFile(
            name='test_image.jpg',
            content=open(current_dir + '/images/stone_cold_steve_kevin.jpg', 'rb').read(),
            content_type='image/jpeg')
        self.sales_rep = SalesRep.objects.create(
            name='Test Guy',
            city='Logan',
            state='Utah',
            phone='8015895857',
            email='test@test.com',
            original=image
        )
        user = User(
            email='test@test.com', name='Test Guy', postal_code=84321,
            user_type='homeowner')
        user.set_password('meo12345')
        user.save()
        self.user = user

    def login(self):
        self.client.login(email=self.user, password='meo12345')

    def test_get_sales_reps_with_get(self):
        self.login()
        self.sales_rep.postal_codes.add(self.postal_code_one)
        url = (
            reverse('rest-salesreps:list') +
            '?postal_code=84321&postal_code=84326'
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'test@test.com')

    def test_get_sales_reps_with_get_and_other_postal_code(self):
        self.login()
        self.sales_rep.postal_codes.add(self.postal_code_two)
        url = (
            reverse('rest-salesreps:list') +
            '?postal_code=84321&postal_code=84326'
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'test@test.com')

    def test_get_sales_reps_with_post(self):
        self.login()
        self.sales_rep.postal_codes.add(self.postal_code_one)
        url = reverse('rest-salesreps:list')
        data = {
            'postal_codes': [
                '84321',
                '84326'
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'test@test.com')

    def test_get_sales_reps_with_post_and_other_postal_code(self):
        self.login()
        self.sales_rep.postal_codes.add(self.postal_code_two)
        url = reverse('rest-salesreps:list')
        data = {
            'postal_codes': [
                '84321',
                '84326'
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'test@test.com')
