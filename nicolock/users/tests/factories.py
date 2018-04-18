import factory


class UserFactory(factory.django.DjangoModelFactory):
    email = factory.Sequence(lambda n: 'user-{0}@example.com'.format(n))
    name = factory.Sequence(lambda n: 'Test Name')
    slug = factory.Sequence(lambda n: 'test-name')
    user_type = factory.Sequence(lambda n: 'homeowner')
    postal_code = factory.Sequence(lambda n: '84321')
    password = factory.PostGenerationMethodCall('set_password', 'password')

    class Meta:
        model = 'users.User'
        django_get_or_create = ('email', )
