from datetime import datetime, date, time

from django.db import models
from django.utils.translation import ugettext_lazy as _

from autoslug.fields import AutoSlugField
from froala_editor.fields import FroalaField
from pytz import all_timezones, timezone



class Event(models.Model):
    TIMEZONES = zip(all_timezones, all_timezones)

    name = models.CharField(_('name'), max_length=255)
    description = FroalaField(_('description'), blank=True)
    start_date = models.DateField(_('start date'))
    start_time = models.TimeField(_('start time'))
    end_date = models.DateField(_('end date'))
    end_time = models.TimeField(_('end time'))
    timezone = models.CharField(_('timezone'),
                                max_length=255,
                                choices=TIMEZONES)
    address = models.TextField(_('address'))
    city = models.CharField(_('city'), max_length=255)
    state = models.CharField(_('state'), max_length=55)
    postal_code = models.CharField(_('postal code'), max_length=12)
    register_link = models.URLField(_('register_link'), blank=True)
    slug = AutoSlugField(unique=True, populate_from='name')

    def __str__(self):
        return self.name

    def get_start_datetime(self):
        time = self.start_time.replace(tzinfo=timezone(self.timezone))
        return datetime.combine(self.start_date, time)

    def get_end_datetime(self):
        time = self.end_time.replace(tzinfo=timezone(self.timezone))
        return datetime.combine(self.end_date, time)
