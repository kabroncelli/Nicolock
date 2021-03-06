# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-11-17 15:46
from __future__ import unicode_literals

from django.db import migrations

def initialize_landing_pages(apps, schema_editor):
    LandingPage = apps.get_model('landing', 'LandingPage')
    Template = apps.get_model('landing', 'Template')
    collage_one, _ = Template.objects.get_or_create(
        type='collage_one',
        name='Collage One - Homeowner',
        top_left_button_one_label='Products',
        top_left_button_one_link='/products/',
        top_right_button_one_label='Find Inspiration',
        top_right_button_one_link='/image-library/',
        top_right_button_two_label='Find a Dealer',
        top_right_button_two_link='/dealers/',
        top_right_button_three_label='Find a Contractor',
        top_right_button_three_link='/contractors/',
        top_right_sidebar_title='Your Outdoor Oasis Starts Here',
        top_right_sidebar_text='Our superior color blending means that your paver will be vibrant the moment they arrive at your home and will stay looking that way year after year.',
        bottom_left_button_one_label='Pavershield Technology',
        bottom_left_button_one_link='/pavershield-technology/',
    )
    collage_one_products, _ = Template.objects.get_or_create(
        type='collage_one',
        name='Collage One - Products',
        top_right_sidebar_title='Partner With the Best to Build a Foundation of Success',
        top_right_sidebar_text='Nicolock’s comprehensive resource center for product knowledge, hardscape certification, installation know-how and marketing. Our business is built on the success of yours.',
    )
    collage_two, _ = Template.objects.get_or_create(
        type='collage_two',
        name='Collage Two - Contractors',
        top_left_button_one_label='Products',
        top_left_button_one_link='/products/',
        top_right_button_one_label='Grow Your Business',
        top_right_button_one_link='/contractor/',
        top_right_button_two_label='Strengthen Your Skills',
        top_right_button_two_link='/contractor/',
        top_right_sidebar_title='Partner With the Best to Build a Foundation of Success',
        top_right_sidebar_text='Nicolock’s comprehensive resource center for product knowledge, hardscape certification, installation know-how and marketing. Our business is built on the success of yours.',
        bottom_right_button_one_label='Resources, Specs, Design Guides + More',
        bottom_right_button_one_link='/contractor/',
    )
    collage_three, _ = Template.objects.get_or_create(
        type='collage_three',
        name='Collage Three - Dealers',
        top_left_button_one_label='Products',
        top_left_button_one_link='/products/',
        top_right_button_one_label='Co-Op Opportunities',
        top_right_button_one_link='/retail/',
        top_right_button_two_label='Image Library',
        top_right_button_two_link='/image-library/',
        top_right_button_three_label='Contact a Sales Rep',
        top_right_button_three_link='/salesreps/',
        top_right_sidebar_title='Why Nicolock',
        top_right_sidebar_text='Cupcake ipsum dolor. Sit amet bonbon gummies marshmallow biscuit. Wafer candy ice cream I love. Marshmallow topping donut sesame snaps powder.',
        bottom_left_button_one_label='Training/Events Product Knowledge',
        bottom_left_button_one_link='/events/',
        bottom_right_button_one_label='Technical Specs',
        bottom_right_button_one_link='/products/technical-specs/',
    )
    button, _ = Template.objects.get_or_create(
        type='button',
        name='Button - Commercial',
        button_label='Request a Quote',
        button_link='/quote/',
        button_description=(
            'Design big. With the largest selection of hardscape products ' +
            'in the industry, Nicolock has a style and solution for any ' +
            'commercial application. Our superior pavers, fortified with ' +
            'Paver-Shieldtm for strength and top-to-bottom color, are ' +
            'manufactured to withstand the challenges of the mostly highly ' +
            'trafficked environments. And, our Commercial Concierge is here ' +
            'to help you meet the demands of your most challenging clients.'
        )
    )
    LandingPage.objects.get_or_create(
        name='Homeowners', slug='homeowner', template=collage_one)
    LandingPage.objects.get_or_create(
        name='Products', slug='products', template=collage_one_products)
    LandingPage.objects.get_or_create(
        name='Contractors', slug='contractor', template=collage_two)
    LandingPage.objects.get_or_create(
        name='Dealers', slug='retail', template=collage_three)
    LandingPage.objects.get_or_create(
        name='Commercial', slug='commercial', template=button)

def reverse_migration(apps, schema_editor):
    LandingPage = apps.get_model('landing', 'LandingPage')
    Template = apps.get_model('landing', 'Template')
    LandingPage.objects.all().delete()
    Template.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0002_auto_20171116_2339'),
    ]

    operations = [
        migrations.RunPython(initialize_landing_pages, reverse_migration),
    ]
