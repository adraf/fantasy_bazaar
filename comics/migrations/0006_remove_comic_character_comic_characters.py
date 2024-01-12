# Generated by Django 5.0.1 on 2024-01-12 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('characters', '0001_initial'),
        ('comics', '0005_comic_authors'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comic',
            name='character',
        ),
        migrations.AddField(
            model_name='comic',
            name='characters',
            field=models.ManyToManyField(related_name='comics', to='characters.character'),
        ),
    ]
