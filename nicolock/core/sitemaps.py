from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps import GenericSitemap
from django.urls import reverse

from nicolock.products.models import Product, Category
from nicolock.users.models import User
from nicolock.pages.models import Page
from nicolock.design.models import DesignIdea
from nicolock.faqs.models import Faq
from nicolock.galleries.models import Gallery, InspirationalPhoto
from nicolock.library.models import Image
from nicolock.videos.models import Video
from nicolock.landing.models import LandingPage


class StaticViewSitemap(Sitemap):
    priority = 0.6
    changefreq = 'daily'

    def items(self):
        return [
            'home', 'find-contractors', 'core:search', 'core:quote',
            'dealers:list', 'design:redirect', 'faqs:list',
            'galleries:inspiration-list', 'innovation:redirect',
            'library:list', 'videos:list'
        ]

    def location(self, item):
        return reverse(item)

landing_info_dict = {
    'queryset': LandingPage.objects.all(),
}
LandingPageSitemap = GenericSitemap(
    landing_info_dict, priority=0.6, changefreq='daily')

product_info_dict = {
    'queryset': Product.objects.all(),
}
ProductSitemap = GenericSitemap(
    product_info_dict, priority=0.6, changefreq='daily')

pages_info_dict = {
    'queryset': Page.objects.filter(published=True),
}
PageSitemap = GenericSitemap(
    pages_info_dict, priority=0.6, changefreq='daily')

categories_info_dict = {
    'queryset': Category.objects.all(),
}
CategorySitemap = GenericSitemap(
    categories_info_dict, priority=0.6, changefreq='daily')

design_info_dict = {
    'queryset': DesignIdea.objects.all(),
}
DesignSitemap = GenericSitemap(
    design_info_dict, priority=0.6, changefreq='daily')

inspriation_info_dict = {
    'queryset': InspirationalPhoto.objects.all(),
}
InspirationSitemap = GenericSitemap(
    inspriation_info_dict, priority=0.6, changefreq='daily')

gallery_info_dict = {
    'queryset': Gallery.objects.all(),
}
GallerySitemap = GenericSitemap(
    gallery_info_dict, priority=0.6, changefreq='daily')

library_info_dict = {
    'queryset': Image.objects.all(),
}
LibrarySitemap = GenericSitemap(
    library_info_dict, priority=0.6, changefreq='daily')

videos_info_dict = {
    'queryset': Video.objects.all(),
}
VideoSitemap = GenericSitemap(
    videos_info_dict, priority=0.6, changefreq='daily')

users_info_dict = {
    'queryset': User.objects.all(),
}
UsersSitemap = GenericSitemap(
    users_info_dict, priority=0.6, changefreq='daily')

sitemaps = {
    'landing': LandingPageSitemap,
    'products': ProductSitemap,
    'categories': CategorySitemap,
    'pages': PageSitemap,
    'design': DesignSitemap,
    'inspiration': InspirationSitemap,
    'galleries': GallerySitemap,
    'libraries': LibrarySitemap,
    'videos': VideoSitemap,
    'users': UsersSitemap,
    'static_views': StaticViewSitemap,
}
