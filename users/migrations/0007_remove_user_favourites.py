# Generated by Django 5.0.1 on 2024-01-17 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_user_favourites'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='favourites',
        ),
    ]
