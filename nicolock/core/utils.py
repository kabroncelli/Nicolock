# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import time

from django.conf import settings

import geocoder
import requests
from slugify import Slugify


slugify_lower = Slugify(to_lower=True)


def get_address_coordinates(address):
    geocode_result = geocoder.google(address)
    if geocode_result.status == 'OK':
        return [geocode_result.lat, geocode_result.lng]
    return None


def get_postal_code_coordinates(postal_code):
    url = 'https://www.zipcodeapi.com/rest/{0}/info.json/{1}/degress'.format(
        settings.ZIP_CODE_API_KEY, postal_code)
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        return [data['lat'], data['lng']]  # index 0 is lat index 1 is lon
    time.sleep(0.5)
    # Try again after a pause if it doesn't work
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        return [data['lat'], data['lng']]  # index 0 is lat index 1 is lon
    return None


def get_nearby_postal_codes(postal_code, radius=10):
    url = 'https://www.zipcodeapi.com/rest/{0}/radius.json/{1}/{2}/miles'.format(
        settings.ZIP_CODE_API_KEY, postal_code, radius)
    response = requests.get(url)
    if response.status_code == 200:
        data = json.loads(response.text)
        postal_code_list = [zip_code['zip_code'] for zip_code in data['zip_codes']]
        return postal_code_list
    return []


def get_url_list():
    from nicolock.galleries.models import Gallery, InspirationalPhoto
    from nicolock.products.models import Product, Category
    from nicolock.videos.models import Video
    from nicolock.library.models import Image
    from nicolock.pages.models import Page

    urls = [
        '/',
        '/contractor/',
        '/contractors/',
        '/commercial/',
        '/dealers/',
        '/design-ideas/',
        '/faqs/',
        '/innovation/',
        '/inspiration/'
    ]
    urls += InspirationalPhoto.get_urls()
    urls += [
        '/image-library/'
    ]
    urls += Image.get_urls()
    urls += [
        '/products/'
    ]
    urls += Product.get_urls()
    urls += Category.get_urls()
    urls += [
        '/search/',
        '/quote/'
    ]
    urls += [
        '/videos/'
    ]
    urls += Video.get_urls()
    urls += Page.get_urls()
    return urls


def get_url_choices():
    url_list = get_url_list()
    return [(url, url) for url in url_list]
