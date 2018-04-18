from django.conf import settings


def social_settings(request):
    return {
        'FACEBOOK_APP_ID': settings.FACEBOOK_APP_ID,
        'HOUZZ_ID': settings.HOUZZ_ID
    }
