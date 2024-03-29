# Generated by Django 5.0.1 on 2024-01-17 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comics', '0008_alter_comic_description'),
        ('users', '0005_remove_user_favourites'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favourites',
            field=models.ManyToManyField(blank=True, related_name='comics_fav', to='comics.comic'),
        ),
    ]
