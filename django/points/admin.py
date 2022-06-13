from django.contrib import admin
from .models import Category, Point, Path, Image, PointInPath, Report

# Register your models here.
admin.site.site_header = 'Приложение для экскурсовода'


class PointAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'category', 'long', 'lat', 'works']
    list_filter = ['category',]


class ReportAdmin(admin.ModelAdmin):
    list_display = ['user', ]
    list_filter = ['category',]


class PointInPathInLine(admin.TabularInline):
    model = PointInPath
    verbose_name = "Точка на карте"
    verbose_name_plural = "Точки на карте"


class PathAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'created_at', 'updated_at', 'works']
    inlines = [PointInPathInLine]


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title',]


class ImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


admin.site.register(Point, PointAdmin)
admin.site.register(Path, PathAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Image, ImageAdmin)
