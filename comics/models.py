from django.db import models

# Create your models here.
class Comic(models.Model):
  title = models.CharField(max_length=255)
  artwork = models.CharField(max_length=255)
  author = models.CharField(max_length=255)
  artist = models.CharField(max_length=255)
  character = models.CharField(max_length=255)
  description = models.CharField(max_length=255)
  release_date = models.DateField()
  owner = models.ForeignKey(
    to='users.User',
    on_delete=models.CASCADE,
    related_name='comics_owned',
    null=True
  )
  favourites = models.ManyToManyField(
    to='users.User',
    related_name = 'comics_fav'
  )

  def __str__(self):
    return f'{self.title} - {self.author} ({self.release_date})'

