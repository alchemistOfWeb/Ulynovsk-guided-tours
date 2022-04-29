from django.db import models


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
    description = models.TextField('описание', max_length=4096, blank=True, null=False)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, related_name='points', blank=True, null=False)
    main_img = models.ForeignKey('points.Image', 
                                 on_delete=models.DO_NOTHING, 
                                 related_name='points', 
                                 blank=True, null=True)
    long = models.DecimalField('долгота', max_digits=9, decimal_places=6, blank=True, null=True)
    lat = models.DecimalField('широта', max_digits=9, decimal_places=6, blank=True, null=True)

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
                                    through='points.PointPath', 
                                    through_fields=('path', 'point'))
    
    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = 'Маршрут'
        verbose_name_plural = 'Маршруты'


class PointPath(models.Model):
    point = models.ForeignKey(Point, on_delete=models.CASCADE)
    path = models.ForeignKey(Path, on_delete=models.CASCADE)
