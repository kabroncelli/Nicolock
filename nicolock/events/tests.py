from datetime import date, time, timedelta

from django.core.urlresolvers import reverse
from django.utils import timezone
from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status

from .models import Event
from nicolock.users.models import User


class TestModels(TestCase):

    def setUp(self):
        self.start_time = time(10, 0)
        self.end_time = time(12, 0)
        self.client = APIClient()

        user = User(
            email='test@test.com', name='Test Guy', postal_code=84321,
            user_type='homeowner')
        user.set_password('meo12345')
        user.save()
        self.user = user

    def login(self):
        self.client.login(email=self.user, password='meo12345')

    def test_get_events_api(self):
        self.login()
        event1 = Event.objects.create(
            name='Event 1', description='Lots of fun stuff here',
            start_date=date.today(), start_time=self.start_time,
            end_date=date.today(), end_time=self.end_time,
            timezone='MDT', address='255 S 300 W', city='Logan', state='UT',
            postal_code='84321')
        event2 = Event.objects.create(
            name='Event 2', description='Lots of fun stuff here',
            start_date=date.today(), start_time=self.start_time,
            end_date=date.today(), end_time=self.end_time,
            timezone='MDT', address='255 S 300 W', city='Logan', state='UT',
            postal_code='84321')
        url = '{0}?month={1}&year={2}'.format(
            reverse('rest-events:list'), date.today().month, date.today().year)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_event_creation(self):
        event1 = Event.objects.create(
            name='Event 1', description='Lots of fun stuff here',
            start_date=date.today(), start_time=self.start_time,
            end_date=date.today(), end_time=self.end_time,
            timezone='MDT', address='255 S 300 W', city='Logan', state='UT',
            postal_code='84321')
        event2 = Event.objects.create(
            name='Event 2', description='Lots of fun stuff here',
            start_date=date.today(), start_time=self.start_time,
            end_date=date.today(), end_time=self.end_time,
            timezone='MDT', address='255 S 300 W', city='Logan', state='UT',
            postal_code='84321')
        self.assertEqual(Event.objects.all().count(), 2)

    def test_event_str_method(self):
        event1 = Event.objects.create(
            name='Event 1', description='Lots of fun stuff here',
            start_date=date.today(), start_time=self.start_time,
            end_date=date.today(), end_time=self.end_time,
            timezone='MDT', address='255 S 300 W', city='Logan', state='UT',
            postal_code='84321')
        self.assertEqual(event1.__str__(), 'Event 1')

    def test_get_datetime_with_correct_timezone(self):
        utc_datetime = timezone.now()
        utc_datetime = utc_datetime.replace(
            hour=self.start_time.hour, minute=0, second=0, microsecond=0)
        utc_end_datetime = utc_datetime.replace(hour=self.end_time.hour)
        event = Event.objects.create(
            name='Event 1', description='Lots of fun stuff here',
            start_date=utc_datetime.date(), start_time=utc_datetime.time(),
            end_date=utc_end_datetime.date(),
            end_time=utc_end_datetime.time(),
            timezone=utc_datetime.tzname(), address='255 S 300 W',
            city='Logan', state='UT', postal_code='84321')
        self.assertEqual(event.get_start_datetime(), utc_datetime)
        self.assertEqual(event.get_end_datetime(), utc_end_datetime)
