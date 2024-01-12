from .common import AuthorSerializer
from comics.serializers.common import ComicSerializer

class PopulatedAuthorSerializer(AuthorSerializer):
  comics = ComicSerializer(many=True)