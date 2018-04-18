# -*- coding: utf-8 -*-
from __future__ import absolute_import

import os
from celery import Celery
from django.apps import apps, AppConfig
from django.conf import settings


if not settings.configured:
    # set the default Django settings module for the 'celery' program.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')  # pragma: no cover


app = Celery('nicolock')


class CeleryConfig(AppConfig):
    name = 'nicolock.taskapp'
    verbose_name = 'Celery Config'

    def ready(self):
        # Using a string here means the worker will not have to
        # pickle the object when using Windows.
        app.config_from_object('django.conf:settings')
        installed_apps = [app_config.name for app_config in apps.get_app_configs()]
        app.autodiscover_tasks(lambda: installed_apps, force=True)

        if hasattr(settings, 'RAVEN_CONFIG'):
            # Celery signal registration
            from raven import Client as RavenClient
            from raven.contrib.celery import register_signal as raven_register_signal
            from raven.contrib.celery import register_logger_signal as raven_register_logger_signal

            raven_client = RavenClient(dsn=settings.RAVEN_CONFIG['DSN'])
            raven_register_logger_signal(raven_client)
            raven_register_signal(raven_client)


@app.task()
def email_users(users, subject, message):
    for user in users:
        user.email_user(subject, message)

@app.task()
def notify_staff(logentry, users):
    for user in users:
        message = "{0} {1} for {2}".format(
            logentry.user, logentry.get_change_message().lower().replace('.', ''), 
            repr(logentry.get_edited_object()))
        user.email_user('Site Change: {}'.format(logentry.get_change_message()), 
                        message)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))  # pragma: no cover
