from rest_framework.serializers import ModelSerializer
from ..models import Comic

class ComicSerializer(ModelSerializer):
  class Meta:
    model = Comic
    fields = '__all__'

# Favourited Comics
# class FavouritedComicsSerializer(ModelSerializer):
#   class Meta:
#     model = Comic
#     fields = ['id', 'username', 'title', 'artwork']