from django.db import models

# Create your models here.
class Character(models.Model):
  name = models.CharField(max_length=255)
  image = models.TextField(max_length=2000, blank=True, null=True)

  def __str__(self):
    return self.name