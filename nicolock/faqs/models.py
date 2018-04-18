from django.db import models

from django.utils.translation import ugettext_lazy as _


class Category(models.Model):
    name = models.CharField(_('name'), max_length=55)
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    order = models.PositiveIntegerField(_('order'), default=1,
        help_text=_('Will fall back to the last time saved'))

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')
        ordering = ['order', 'modified']

    def __str__(self):
        return self.name


class Faq(models.Model):
    category = models.ForeignKey(Category, related_name='faqs')
    question = models.TextField(_('Question'), blank=True)
    answer = models.TextField(_('Answer'), blank=True)
    related = models.ManyToManyField('self', blank=True)
    order = models.PositiveIntegerField(_('Order'), default=1,
        help_text=_('Will fall back to the last time saved'))
    modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.question
