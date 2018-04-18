from .models import Menu


def menu(request):
    path = request.path
    try:
        path = '/{}/'.format(path.split('/')[1].lower())
    except Exception as e:
        pass
    else:
        if path not in Menu.get_default_urls():
            path = request.path
    section_one = Menu.objects.filter(url__icontains=path, section='section_one').first()
    section_two = Menu.objects.filter(url__icontains=path, section='section_two').first()
    section_three = Menu.objects.filter(url__icontains=path, section='section_three').first()
    return {
        'menus': {
            'section_one': section_one,
            'section_two': section_two,
            'section_three': section_three,
        }
    }
