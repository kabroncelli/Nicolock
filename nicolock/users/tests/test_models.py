from test_plus.test import TestCase

from .factories import UserFactory
from ..models import CompanyProfile


class TestUser(TestCase):
    user_factory = UserFactory

    def setUp(self):
        self.user = self.make_user('test@test.com')

    def test__str__(self):
        self.assertEqual(
            self.user.__str__(),
            'test@test.com'  # This is the default username for self.make_user()
        )

    def test_get_absolute_url(self):
        self.assertEqual(
            self.user.get_absolute_url(),
            '/test-name/galleries/'
        )


class TestCompanyProfile(TestCase):

    def test_create_company_profile_with_certifications(self):
        profile1 = CompanyProfile.objects.create(longitude=-111.8335363,
            latitude=41.7400877)
        profile2 = CompanyProfile.objects.create(
            certifications=['np', 'nw'], longitude=-111.8335363,
            latitude=41.7400877)
        profile3 = CompanyProfile.objects.create(
            certifications=['np'], longitude=-111.8335363,
            latitude=41.7400877)
        profile4 = CompanyProfile.objects.create(
            certifications=['nw'], longitude=-111.8335363,
            latitude=41.7400877)
        self.assertTrue(CompanyProfile.objects.all().count(), 4)
