import pathlib

from django.conf import settings
from django.core.urlresolvers import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from ..models import Dealer
from nicolock.users.models import User


class TestApi(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.dealer = Dealer.objects.create(
            name='Test Guy',
            address='255 S 300 W',
            city='Logan',
            state='Utah',
            phone='8015895857',
            postal_code='84321',
            lat=41.717744,
            lng=-111.836780
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
        url = (
            reverse('rest-dealers:list') +
            '?postal_code=84321&postal_code=84326'
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Guy')

    def test_get_sales_reps_with_get_and_other_postal_code(self):
        self.login()
        url = (
            reverse('rest-dealers:list') +
            '?postal_code=84321&postal_code=84326'
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Guy')

    def test_get_sales_reps_with_post(self):
        self.login()
        url = reverse('rest-dealers:list')
        data = {
            'postal_codes': [
                '84321',
                '84326'
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Guy')

    def test_get_sales_reps_with_post_and_other_postal_code(self):
        self.login()
        url = reverse('rest-dealers:list')
        data = {
            'postal_codes': [
                '84321',
                '84326'
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, 'Test Guy')
