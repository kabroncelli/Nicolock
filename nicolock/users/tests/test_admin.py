from test_plus.test import TestCase

from .factories import UserFactory
from ..admin import UserCreationForm


class TestUserCreationForm(TestCase):
    user_factory = UserFactory

    def setUp(self):
        self.user = self.make_user('test@test.com')

    def test_clean_username_success(self):
        # Instantiate the form with a new email
        form = UserCreationForm({
            'email': 'test2@test.com',
            'name': 'Test Guy',
            'postal_code': '84321',
            'user_type': 'homeowner',
            'password1': '7jefB#f@Cc7YJB]2v',
            'password2': '7jefB#f@Cc7YJB]2v',
        })
        # Run is_valid() to trigger the validation
        valid = form.is_valid()
        self.assertTrue(valid)

        email = form.cleaned_data['email']
        self.assertEqual('test2@test.com', email)

    def test_clean_username_false(self):
        # Instantiate the form with the same email as self.user
        form = UserCreationForm({
            'email': self.user.email,
            'name': 'Test Guy',
            'postal_code': '84321',
            'user_type': 'homeowner',
            'password1': '7jefB#f@Cc7YJB]2v',
            'password2': '7jefB#f@Cc7YJB]2v',
        })
        # Run is_valid() to trigger the validation, which is going to fail
        # because the email is already taken
        valid = form.is_valid()
        self.assertFalse(valid)

        # The form.errors dict should contain a single error called 'email'
        self.assertTrue(len(form.errors) == 1)
        self.assertTrue('email' in form.errors)
