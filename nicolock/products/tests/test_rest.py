# -*- coding: utf-8 -*-
from django.test import TestCase
from django.core.urlresolvers import reverse

from rest_framework.test import APIClient
from rest_framework import status

from ..models import Category, Product
from nicolock.users.models import User


class TestLike(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='Category')
        self.product = Product.objects.create(
            name='Paver', category=self.category)
        user = User(
            email='test@test.com', name='Test Guy', postal_code=84321,
            user_type='homeowner')
        user.set_password('meo12345')
        user.save()
        self.user = user

    def login(self):
        self.client.login(email=self.user, password='meo12345')

    def test_like_endpoint(self):
        self.login()
        url = reverse('rest-products:product-like', kwargs={'pk': self.product.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.like_count, 1)
