from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


def validate_slashes(url):
    if 'http' in url:
        return
    if not url.startswith('/') or not url.endswith('/'):
        raise ValidationError(
            _('Please make sure the url begins and ends with a slash')
        )
