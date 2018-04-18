import pathlib

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from ..models import Category, Product, Accessory, Countertop
from nicolock.videos.models import Video


class TestCategory(TestCase):

    def test_category_with_duplicate_name_slug(self):
        cat1 = Category.objects.create(name='Category')
        cat1.save()
        cat2 = Category.objects.create(name='Category')
        cat3 = Category.objects.create(name='Category')
        self.assertEqual(cat1.slug, 'category')
        self.assertEqual(cat2.slug, 'category-2')
        self.assertEqual(cat3.slug, 'category-3')


class TestProduct(TestCase):

    def setUp(self):
        self.current_dir = str(pathlib.Path(__file__).parent)
        self.category = Category.objects.create(name='Category')
        self.video = Video.objects.create(
            name='Key and Peele', url='https://youtu.be/AslncyG8whg')
        self.simple_image = SimpleUploadedFile(
            name='test_image.jpg',
            content=open(self.current_dir + '/images/stone_cold_steve_kevin.jpg', 'rb').read(),
            content_type='image/jpeg')

    def test_product_with_duplicate_name_slug(self):
        product1 = Product.objects.create(name='Product Thing',
                                          category=self.category)
        product1.save()
        product2 = Product.objects.create(name='Product Thing',
                                          category=self.category)
        product3 = Product.objects.create(name='Product Thing',
                                          category=self.category)
        self.assertEqual(product1.slug, 'product-thing')
        self.assertEqual(product2.slug, 'product-thing-2')
        self.assertEqual(product3.slug, 'product-thing-3')

    def test_product_with_related_products(self):
        product1 = Product.objects.create(name='Product One',
                                          category=self.category)
        product2 = Product.objects.create(name='Product Two',
                                          category=self.category)
        product3 = Product.objects.create(name='Product Three',
                                          category=self.category)
        product1.related_products.add(product2)
        product1.related_products.add(product3)
        products = [product.id for product
                    in Product.objects.exclude(id=product1.id)]
        expected_products = [product.id for product
                             in product1.related_products.all()]
        self.assertEqual(expected_products, products)

    def test_product_with_related_videos(self):
        product1 = Product.objects.create(name='Product One',
                                          category=self.category)
        product1.related_videos.add(self.video)
        videos = [video.id for video in Video.objects.all()]
        expected_videos = [video.id for
                           video in
                           product1.related_videos.all()]
        self.assertEqual(expected_videos, videos)

    def test_product_with_accessories(self):
        product1 = Product.objects.create(name='Product One',
                                          category=self.category)
        Accessory.objects.create(
            name='Accessory',
            original=self.simple_image,
            product=product1)
        accessories = [accessory.id for accessory in Accessory.objects.all()]
        expected_accessories = [accessory.id for
                                accessory in
                                product1.accessories.all()]
        self.assertEqual(expected_accessories, accessories)

    def test_product_with_countertops(self):
        product1 = Product.objects.create(name='Product One',
                                          category=self.category)
        Countertop.objects.create(
            name='Countertop',
            original=self.simple_image,
            product=product1)
        countertops = [countertop.id for countertop in Countertop.objects.all()]
        expected_countertops = [countertop.id for
                                countertop in
                                product1.countertops.all()]
        self.assertEqual(expected_countertops, countertops)
