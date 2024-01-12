from rest_framework.serializers import ModelSerializer
from ..models import Comic

class ComicSerializer(ModelSerializer):
  class Meta:
    model = Comic
    fields = '__all__'