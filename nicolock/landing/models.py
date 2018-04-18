from django.core.urlresolvers import reverse
from django.db import models

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class LandingPage(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True)
    template = models.ForeignKey('landing.Template')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        url_kwargs = {
            'url': self.slug
        }
        return reverse('pages', kwargs=url_kwargs)

    @classmethod
    def get_base_breadcrumbs(clss):
        return clss.objects.values_list('slug', flat=True)


class Template(models.Model):
    COLLAGE_ONE = 'collage_one'
    COLLAGE_TWO = 'collage_two'
    COLLAGE_THREE = 'collage_three'
    BUTTON = 'button'
    COLLAGE_ONE_LABEL = 'Collage One'
    COLLAGE_TWO_LABEL = 'Collage Two'
    COLLAGE_THREE_LABEL = 'Collage Three'
    BUTTON_LABEL = 'Button'
    TYPES = [
        (COLLAGE_ONE, COLLAGE_ONE_LABEL),
        (COLLAGE_TWO, COLLAGE_TWO_LABEL),
        (COLLAGE_THREE, COLLAGE_THREE_LABEL),
        (BUTTON, BUTTON_LABEL),
    ]
    type = models.CharField(
        choices=TYPES, max_length=55,
        help_text=('The collage templates have 4 general areas: top-left, ' +
                   'top-right, bottom-left and bottom-right. The button ' +
                   'template just has one button/link with a description in ' +
                   'the middle'))
    name = models.CharField(max_length=255)

    top_left_button_one_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will display in all the collage templates')
    top_left_button_one_link = models.CharField(blank=True, max_length=255)
    top_left_background_one_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    top_left_background_one_image_compressed = ImageSpecField(
        source='top_left_background_one_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    top_right_button_one_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will display in all the collage templates')
    top_right_button_one_link = models.CharField(blank=True, max_length=255)
    top_right_background_one_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    top_right_background_one_image_compressed = ImageSpecField(
        source='top_right_background_one_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    top_right_button_two_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will display in all the collage templates')
    top_right_button_two_link = models.CharField(blank=True, max_length=255)
    top_right_background_two_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    top_right_background_two_image_compressed = ImageSpecField(
        source='top_right_background_two_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    top_right_button_three_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will only display in the collage one and collage three templates')
    top_right_button_three_link = models.CharField(blank=True, max_length=255)
    top_right_background_three_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    top_right_background_three_image_compressed = ImageSpecField(
        source='top_right_background_three_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    top_right_sidebar_title = models.TextField(
        blank=True, help_text='Will only display in the collage templates')
    top_right_sidebar_text = models.TextField(blank=True)

    bottom_left_button_one_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will display in all the collage templates')
    bottom_left_button_one_link = models.CharField(blank=True, max_length=255)
    bottom_left_background_one_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    bottom_left_background_one_image_compressed = ImageSpecField(
        source='bottom_left_background_one_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    bottom_left_button_two_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will only display in the collage one template')
    bottom_left_button_two_link = models.CharField(blank=True, max_length=255)
    bottom_left_background_two_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    bottom_left_background_two_image_compressed = ImageSpecField(
        source='bottom_left_background_two_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    bottom_right_button_one_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will display in all the collage templates')
    bottom_right_button_one_link = models.CharField(blank=True, max_length=255)
    bottom_right_background_one_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    bottom_right_background_one_image_compressed = ImageSpecField(
        source='bottom_right_background_one_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    button_label = models.CharField(
        blank=True, max_length=255,
        help_text='Will only display in the button template')
    button_description = models.TextField(blank=True)
    button_link = models.CharField(blank=True, max_length=255)
    button_page_background_image = models.ImageField(
        upload_to='template_images', blank=True, null=True)
    button_page_background_image_compressed = ImageSpecField(
        source='button_page_background_image',
        processors=[ResizeToFill(1200, 1200)], format='JPEG',
        options={'quality': 80})

    def __str__(self):
        return self.name
