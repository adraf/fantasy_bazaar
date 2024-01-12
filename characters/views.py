from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Character
from .serializers.common import CharacterSerializer
from .serializers.populated import PopulatedCharacterSerializer

# Path: /characters/
# Methods: GET, POST
class CharacterListCreateView(ListCreateAPIView):
  queryset = Character.objects.all()
  serializer_class = CharacterSerializer

# Path /characters/:pk/
# Methods: GET, PUT, PATCH, DELETE
class CharacterDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Character.objects.all()
  # serializer_class= CharacterSerializer
  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedCharacterSerializer
    return CharacterSerializer