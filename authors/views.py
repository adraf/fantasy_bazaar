from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Author
from .serializers.common import AuthorSerializer
from .serializers.populated import PopulatedAuthorSerializer

# Path: /authors/
# Methods: GET, POST
class AuthorListCreateView(ListCreateAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer

# Path /authors/:pk/
# Methods: GET, PUT, PATCH, DELETE
class AuthorDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Author.objects.all()
  # serializer_class = AuthorSerializer
  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedAuthorSerializer
    return AuthorSerializer