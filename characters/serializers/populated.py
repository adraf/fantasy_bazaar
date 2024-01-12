from .common import CharacterSerializer
from comics.serializers.common import ComicSerializer

class PopulatedCharacterSerializer(CharacterSerializer):
  comics = ComicSerializer(many=True)