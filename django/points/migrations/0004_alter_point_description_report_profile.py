# Generated by Django 4.0.5 on 2022-06-13 14:17

import ckeditor.fields
import ckeditor_uploader.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('points', '0003_path_works_point_works_pointinpath_works'),
    ]

    operations = [
        migrations.AlterField(
            model_name='point',
            name='description',
            field=ckeditor_uploader.fields.RichTextUploadingField(blank=True, default='', max_length=4096, verbose_name='описание'),
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', ckeditor.fields.RichTextField(blank=True, max_length=1000, null=True)),
                ('rate', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'очень плохо'), (2, 'плохо'), (3, 'нормально'), (4, 'хорошо'), (5, 'отлично')], null=True)),
                ('doshow', models.BooleanField(blank=True, default=False, verbose_name='Показывать на главной')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reports', to=settings.AUTH_USER_MODEL, verbose_name='Автор')),
            ],
            options={
                'verbose_name': 'Отзыв',
                'verbose_name_plural': 'Отзывы',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job', models.CharField(blank=True, max_length=255, null=True, verbose_name='Род деятельности')),
                ('phone', models.CharField(blank=True, default='', max_length=12, verbose_name='Телефон')),
                ('user', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Профиль',
                'verbose_name_plural': 'Профили',
            },
        ),
    ]