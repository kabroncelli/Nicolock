import pathlib
import time

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.urlresolvers import reverse
from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from ..models import Product, Category, Accessory, Countertop
from nicolock.users.models import User
from nicolock.videos.models import Video


class FunctionalTests(StaticLiveServerTestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--disable-extensions')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        self.browser = webdriver.Chrome(chrome_options=options)
        self.category = Category.objects.create(name='Category')
        self.product1 = Product.objects.create(name='Product One',
                                               category=self.category)
        self.product2 = Product.objects.create(name='Product Two',
                                               category=self.category)
        self.product3 = Product.objects.create(name='Product Three',
                                               category=self.category)
        self.product1.related_products.add(self.product2)
        self.product1.related_products.add(self.product3)
        self.video = Video.objects.create(
            name='Key and Peele', url='https://youtu.be/AslncyG8whg')
        self.product1.related_videos.add(self.video)
        current_dir = str(pathlib.Path(__file__).parent)
        simple_image = SimpleUploadedFile(
            name='test_image.jpg',
            content=open(current_dir + '/images/stone_cold_steve_kevin.jpg', 'rb').read(),
            content_type='image/jpeg')
        self.accessory = Accessory.objects.create(
            name='Accessory 1',
            original=simple_image,
            product=self.product1,
            description='Accessory Description!')
        self.countertop = Countertop.objects.create(
            name='Countertop 1',
            original=simple_image,
            product=self.product1,
            description='Countertop Description!')
        self.browser.set_window_size(1024, 786)
        user = User(
            email='test@test.com', name='Test Guy', postal_code=84321,
            user_type='homeowner', is_staff=True)
        user.set_password('meo12345')
        user.save()
        self.user = user

    def tearDown(self):
        self.browser.quit()

    def login(self):
        self.browser.get('{0}'.format(self.live_server_url))

        url = reverse(settings.LOGIN_URL)
        self.browser.get('{0}{1}'.format(self.live_server_url, url))

        emailfield = self.browser.find_element_by_id('id_username')
        emailfield.send_keys('test@test.com')

        passwordfield = self.browser.find_element_by_id('id_password')
        passwordfield.send_keys('meo12345')

        passwordfield.send_keys(Keys.ENTER)

    def test_user_can_see_countertops_in_sidebar(self):
        self.login()
        url = reverse(
            'products:product-detail',
            kwargs={
                'product_slug': self.product1.slug,
                'category_slug': self.product1.category.slug
            }
        )
        self.browser.get('{0}{1}'.format(self.live_server_url, url))
        time.sleep(0.5)
        h4_tags = self.browser.find_elements_by_tag_name('h4')
        found = False
        for tag in h4_tags:
            if tag.text.lower() == 'countertops':
                tag.click()
                found = True
        time.sleep(0.5)
        self.assertTrue(found)
        el = self.browser.find_element_by_class_name('countertop-container')
        first_image = el.find_elements_by_tag_name('img')[0]
        first_image.click()
        time.sleep(0.25)
        modal = self.browser.find_element_by_class_name('product-modal-container')
        modal_footer = modal.find_element_by_class_name('product-modal-footer')
        title = modal_footer.find_element_by_class_name('title')
        self.assertTrue(title.text.lower() == self.countertop.name.lower())
        description = modal_footer.find_element_by_class_name('paragraph')
        self.assertTrue(description.text.lower() == self.countertop.description.lower())

    def test_user_can_see_accessories_in_sidebar(self):
        self.login()
        url = reverse(
            'products:product-detail',
            kwargs={
                'product_slug': self.product1.slug,
                'category_slug': self.product1.category.slug
            }
        )
        self.browser.get('{0}{1}'.format(self.live_server_url, url))
        time.sleep(0.5)
        h4_tags = self.browser.find_elements_by_tag_name('h4')
        found = False
        for tag in h4_tags:
            if tag.text.lower() == 'accessories':
                tag.click()
                found = True
        time.sleep(0.5)
        self.assertTrue(found)
        el = self.browser.find_element_by_class_name('accessory-container')
        first_image = el.find_elements_by_tag_name('img')[0]
        first_image.click()
        time.sleep(0.25)
        modal = self.browser.find_element_by_class_name('product-modal-container')
        modal_footer = modal.find_element_by_class_name('product-modal-footer')
        title = modal_footer.find_element_by_class_name('title')
        self.assertTrue(title.text.lower() == self.accessory.name.lower())
        description = modal_footer.find_element_by_class_name('paragraph')
        self.assertTrue(description.text.lower() == self.accessory.description.lower())

    def test_user_can_see_related_products_in_sidebar(self):
        self.login()
        url = reverse(
            'products:product-detail',
            kwargs={
                'product_slug': self.product1.slug,
                'category_slug': self.product1.category.slug
            }
        )
        self.browser.get('{0}{1}'.format(self.live_server_url, url))
        time.sleep(0.5)
        h4_tags = self.browser.find_elements_by_tag_name('h4')
        found = False
        for tag in h4_tags:
            if tag.text.lower() == 'related products':
                tag.click()
                found = True
        time.sleep(0.5)
        self.assertTrue(found)
        el = self.browser.find_element_by_class_name('related-product-wrap')
        links = el.find_elements_by_tag_name('a')
        links_hrefs = [link.get_attribute('href') for link in links]
        found = False
        for href in links_hrefs:
            if self.product2.get_absolute_url() in href:
                found = True
        self.assertTrue(found)
        found = False
        for href in links_hrefs:
            if self.product3.get_absolute_url() in href:
                found = True
        self.assertTrue(found)

    def test_user_can_see_related_videos_in_sidebar(self):
        self.login()
        url = reverse(
            'products:product-detail',
            kwargs={
                'product_slug': self.product1.slug,
                'category_slug': self.product1.category.slug
            }
        )
        self.browser.get('{0}{1}'.format(self.live_server_url, url))
        time.sleep(0.5)
        h4_tags = self.browser.find_elements_by_tag_name('h4')
        found = False
        for tag in h4_tags:
            if tag.text.lower() == 'related videos':
                tag.click()
                found = True
        time.sleep(0.5)
        self.assertTrue(found)
        el = self.browser.find_element_by_class_name('related-video-wrap')
        images = el.find_elements_by_tag_name('img')
        image_srcs = [image.get_attribute('src') for image in images]
        found = False
        for src in image_srcs:
            if self.video.thumbnail_url in src:
                found = True
        self.assertTrue(found)
