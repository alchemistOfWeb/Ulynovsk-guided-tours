# Generated by Django 4.0.4 on 2022-04-30 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('points', '0002_pointinpath_path_created_at_path_updated_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='path',
            name='works',
            field=models.BooleanField(default=True, verbose_name='Активен?'),
        ),
        migrations.AddField(
            model_name='point',
            name='works',
            field=models.BooleanField(default=True, verbose_name='Активна?'),
        ),
        migrations.AddField(
            model_name='pointinpath',
            name='works',
            field=models.BooleanField(default=True, verbose_name='Активна?'),
        ),
    ]
