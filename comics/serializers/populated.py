from .common import ComicSerializer
from users.serializers.common import ComicListUserSerializer
from authors.serializers.common import AuthorSerializer
from characters.serializers.common import CharacterSerializer

class ComicListSerializer(ComicSerializer):
  owner = ComicListUserSerializer()
  authors = AuthorSerializer(many=True)
  characters = CharacterSerializer(many=True)
  favourites = ComicListUserSerializer(many=True)