from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  # profile_image = models.TextField(max_length=300, blank=True, null=True)
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)

  