from django.contrib.admin.models import LogEntry
from django.db.models.signals import post_save
from django.dispatch import receiver

from nicolock.users.models import User
from nicolock.taskapp.celery import notify_staff


@receiver(post_save, sender=LogEntry, dispatch_uid="site_change_notification")
def site_change_notification(sender, instance, created, **kwargs):
    pass
    # users = User.objects.filter(is_staff=True)
    # notify_staff.delay(instance, users)
