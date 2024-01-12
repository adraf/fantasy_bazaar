from .common import ComicSerializer
from users.serializers.common import ComicListUserSerializer

class ComicListSerializer(ComicSerializer):
  owner = ComicListUserSerializer()
  favourites = ComicListUserSerializer(many=True)