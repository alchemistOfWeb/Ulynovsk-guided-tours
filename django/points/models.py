from datetime import datetime
from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
import ckeditor
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit


class Profile(models.Model):
    user = models.OneToOneField(
        to=User, on_delete=models.CASCADE, 
        null=False, blank=True, 
        related_name='profile'
    )
    fio = models.CharField(
        max_length=255, null=False, 
        default='', blank=True
    )
    job = models.CharField(
        max_length=255, 
        verbose_name='Род деятельности', 
        null=True, blank=True
    )
    phone = models.CharField(
        max_length=12, 
        verbose_name='Телефон', 
        null=False, default="", 
        blank=True
    )
    image_md = ProcessedImageField(
        verbose_name="avatar(md)",
        upload_to='images/avatars/md/',
        processors=[ResizeToFit(300, 400)],
        format='JPEG',
        options={'quality': 90},
        blank=True,
        null=True
    )
    image_sm = ProcessedImageField(
        verbose_name="avatar(sm)",
        upload_to='images/avatars/sm/',
        processors=[ResizeToFit(100, 100)],
        format='JPEG',
        options={'quality': 90},
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'


class Category(models.Model):
    title = models.CharField(
        max_length=512, blank=False, null=False
    )

    icon = models.ImageField(
        'иконка', 
        upload_to='category_icons/', 
        blank=True, null=True
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Категория точек'
        verbose_name_plural = 'Категории точек'


class Point(models.Model):
    title = models.CharField(
        'заголовок', max_length=512, 
        blank=False, null=False
    )

    description = RichTextUploadingField(
        verbose_name='описание', max_length=8096, 
        blank=True, default='', null=False
    )

    category = models.ForeignKey(
        Category, on_delete=models.DO_NOTHING, 
        related_name='points', 
        blank=True, null=False
    )

    main_img = models.ForeignKey(
        'points.Image', 
        on_delete=models.DO_NOTHING, 
        related_name='points', 
        blank=True, null=True
    )

    lat = models.DecimalField(
        'широта', max_digits=9, 
        decimal_places=6, 
        blank=True, null=True
    )

    long = models.DecimalField(
        'долгота', max_digits=9, 
        decimal_places=6, 
        blank=True, null=True
    )

    address = models.CharField(
        verbose_name='адрес', 
        max_length=512,
        null=False, blank=True,
        default=''
    )

    works = models.BooleanField(
        'Активна?', blank=False, 
        null=False, default=True
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Точка'
        verbose_name_plural = 'Точки'


class VisitedPoints(models.Model):
    point = models.ForeignKey(
        to=Point, related_name='visited_points',
        on_delete=models.CASCADE,
        null=False, blank=False
    )
    user = models.ForeignKey(
        to=User, related_name='visited_points',
        on_delete=models.CASCADE,
        null=False, blank=False
    )
    
    created_at = models.DateTimeField('Дата первого посещения', auto_now_add=True)
    updated_at = models.DateTimeField('Дата последнего посещения', auto_now=True)

    class Meta:
        verbose_name = 'Посещённое место'
        verbose_name_plural = 'Посещённые места'


class Image(models.Model):
    title = models.CharField(
        'заголовок', max_length=512, 
        blank=False, null=False
    )

    caption = models.TextField('описание', max_length=2048)

    point = models.ForeignKey(
        Point, on_delete=models.CASCADE, 
        blank=True, null=True
    )

    img = models.ImageField(
        'изображение', upload_to='images/', 
        blank=False, null=False
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'


class Path(models.Model):
    title = models.CharField('заголовок', max_length=512)

    description = models.TextField(
        'описание', max_length=4096, 
        blank=True, null=False
    )

    # points = models.ManyToManyField(
    #     Point, 
    #     related_name='paths', 
    #     through='points.PointInPath', 
    #     through_fields=('path', 'point')
    # )

    created_at = models.DateTimeField('Создан', auto_now_add=True)
    updated_at = models.DateTimeField('Изменен', auto_now=True)

    works = models.BooleanField(
        'Активен?', blank=False, 
        null=False, default=True
    )
    
    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Маршрут'
        verbose_name_plural = 'Маршруты'


class PointInPath(models.Model):
    point = models.ForeignKey(
        Point, on_delete=models.CASCADE,
        related_name='point_to_path'
    )
    path = models.ForeignKey(
        Path, on_delete=models.CASCADE,
        related_name='path_to_point'
    )

    description = models.TextField(
        'описание', max_length=2048, 
        blank=True, null=False
    )

    works = models.BooleanField(
        'Активна?', blank=False, 
        null=False, default=True
    )

    order = models.PositiveSmallIntegerField(
        'очередь', blank=False, 
        null=False, default=0
    )
    
    class Meta:
        verbose_name = 'Точка на карте'
        verbose_name_plural = 'Точки на карте'


    def __str__(self) -> str:
        return f'{self.point.title}|{self.path.title}'


class RateChoices(models.IntegerChoices):
    VERY_BAD = 1, 'очень плохо'
    BAD = 2, 'плохо'
    NORMAL = 3, 'нормально'
    GOOD = 4, 'хорошо'
    EXCELENT = 5, 'отлично'
    

class Report(models.Model):
    user = models.ForeignKey(
        to=User, 
        verbose_name='Автор', 
        on_delete=models.CASCADE, 
        related_name='reports'
    )

    created_at = models.DateTimeField(
        verbose_name='Создан',
        auto_now_add=True, 
        blank=True
    )

    updated_at = models.DateTimeField(
        verbose_name='Обновлен',
        auto_now=True, blank=True
    )

    content = ckeditor.fields.RichTextField(
        verbose_name='Текст',
        max_length=1000, 
        null=True, blank=True
    )

    rate = models.PositiveSmallIntegerField(
        verbose_name='Оценка',
        choices=RateChoices.choices, 
        null=True, blank=True 
    )

    doshow = models.BooleanField(
        verbose_name='Показывать на главной', 
        null=False, blank=True, 
        default=False
    )

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'


class Order(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        verbose_name='Автор', 
        related_name='orders',
        null=False, blank=True
    )

    path = models.ForeignKey(
        to=Path,
        on_delete=models.CASCADE, 
        verbose_name='маршрут',
        related_name='orders',
        null=False, blank=False
    )

    people = models.PositiveIntegerField(
        'число людей', 
        null=False, blank=True,
        default=1
    )

    comment = models.TextField(
        verbose_name='дополнительные пожелания',
        max_length=500,
        null=False, blank=True, 
        default=''
    )

    contacts = models.TextField(
        verbose_name='Как можно связаться', 
        max_length=500,
        null=False, blank=True, 
        default=''
    )

    created_at = models.DateTimeField(
        verbose_name='Создан',
        auto_now_add=True, 
        null=False, blank=True,
    )

    date = models.DateTimeField(
        verbose_name='Примерная дата для проведения экскурсии',
        null=True, blank=True, 
    )

    class Meta:
        verbose_name = 'Заказ на экскурсию'
        verbose_name_plural = 'Заказы экскурсий'


class Setting(models.Model):
    title = models.CharField(
        max_length=100, 
        default="Приложение для экскурсоводов", 
        null=False, blank=True
    )

    background_pattern = models.ImageField(
        'паттерн на заднем фоне', 
        upload_to='images/settings/', 
        blank=True, null=True
    )

    logo = models.ImageField(
        'паттерн на заднем фоне', 
        upload_to='setting_images/', 
        blank=True, null=True
    )

    reservation_comment = models.TextField(
        "Комментарий перед формой заказа экскурсии", 
        max_length=2000, 
        null=False, blank=True, 
        default=''
    )


    class Meta:
        verbose_name = 'Настройка'
        verbose_name_plural = '      Настройки'
