from django.db import models

# Create your models here.
class Comic(models.Model):
  title = models.CharField(max_length=255)
  artwork = models.CharField(max_length=255)
  authors = models.ManyToManyField(
    to='authors.Author',
    related_name='comics'
  )
  artist = models.CharField(max_length=255)
  characters = models.ManyToManyField(
    to='characters.Character',
    related_name='comics',
  )
  description = models.CharField(max_length=2000)
  release_date = models.DateField()
  owner = models.ForeignKey(
    to='users.User',
    on_delete=models.CASCADE,
    related_name='comics_owned',
    null=True
  )
  favourites = models.ManyToManyField(
    to='users.User',
    related_name = 'comics_fav',
    blank=True
  )

  def __str__(self):
    return f'{self.title} ({self.release_date})'

