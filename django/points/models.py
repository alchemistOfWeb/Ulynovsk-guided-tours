from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
import ckeditor
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=True)
    job = models.CharField(max_length=255, verbose_name='Род деятельности', null=True, blank=True)
    phone = models.CharField(max_length=12, verbose_name='Телефон', null=False, default="", blank=True)

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


class Category(models.Model):
    title = models.CharField(max_length=512, blank=False, null=False)
    icon = models.ImageField('иконка', 
                             upload_to='category_icons/', 
                             blank=True, null=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Категория точек'
        verbose_name_plural = 'Категории точек'


class Point(models.Model):
    title = models.CharField('заголовок', max_length=512, blank=False, null=False)
    description = RichTextUploadingField('описание', max_length=4096, blank=True, default='', null=False)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, related_name='points', blank=True, null=False)
    main_img = models.ForeignKey('points.Image', 
                                 on_delete=models.DO_NOTHING, 
                                 related_name='points', 
                                 blank=True, null=True)
    long = models.DecimalField('долгота', max_digits=9, decimal_places=6, blank=True, null=True)
    lat = models.DecimalField('широта', max_digits=9, decimal_places=6, blank=True, null=True)
    works = models.BooleanField('Активна?', blank=False, null=False, default=True)

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Точка'
        verbose_name_plural = 'Точки'


class Image(models.Model):
    title = models.CharField('заголовок', max_length=512, blank=False, null=False)
    caption = models.TextField('описание', max_length=2048)
    point = models.ForeignKey(Point, on_delete=models.CASCADE, blank=True, null=True)
    img = models.ImageField('изображение', upload_to='images/', blank=False, null=False)
    # do_show

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'


class Path(models.Model):
    title = models.CharField('заголовок', max_length=512)
    description = models.TextField('описание', max_length=4096, blank=True, null=False)
    points = models.ManyToManyField(Point, 
                                    related_name='paths', 
                                    through='points.PointInPath', 
                                    through_fields=('path', 'point'))
    created_at = models.DateTimeField('Создан', auto_now_add=True)
    updated_at = models.DateTimeField('Изменен', auto_now=True)
    works = models.BooleanField('Активен?', blank=False, null=False, default=True)
    
    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Маршрут'
        verbose_name_plural = 'Маршруты'


class PointInPath(models.Model):
    point = models.ForeignKey(Point, on_delete=models.CASCADE)
    path = models.ForeignKey(Path, on_delete=models.CASCADE)
    description = models.TextField('описание', max_length=2048, blank=True, null=False)
    works = models.BooleanField('Активна?', blank=False, null=False, default=True)

    def __str__(self) -> str:
        return f'{self.point.title}|{self.path.title}'


class RateChoices(models.IntegerChoices):
    VERY_BAD = 1, 'очень плохо'
    BAD = 2, 'плохо'
    NORMAL = 3, 'нормально'
    GOOD = 4, 'хорошо'
    EXCELENT = 5, 'отлично'
    

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор', related_name='reports')
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    content = ckeditor.fields.RichTextField(max_length=1000, null=True, blank=True)
    rate = models.PositiveSmallIntegerField(choices=RateChoices.choices, null=True, blank=True)
    doshow = models.BooleanField(verbose_name='Показывать на главной', null=False, blank=True, default=False)

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
