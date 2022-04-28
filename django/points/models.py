from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=512)

    def __str__(self) -> str:
        return self.title


class Point(models.Model):
    title = models.CharField('заголовок', max_length=512)
    description = models.TextField('описание', max_length=4096)
    main_img = models.ImageField('изображение')
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, related_name='points')

    def __str__(self) -> str:
        return self.title


class Image(models.Model):
    title = models.CharField('заголовок', max_length=512)
    caption = models.TextField('описание', max_length=2048)

    def __str__(self) -> str:
        return self.title


class Path(models.Model):
    title = models.CharField('заголовок', max_length=512)
    points = models.ManyToManyField()


class PointPath(models.Model):
    point = models.ForeignKey(Point, on_delete=models.CASCADE)
    path = models.ForeignKey(Path, on_delete=models.CASCADE)
