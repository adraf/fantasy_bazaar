from rest_framework.generics import RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from .models import Comic
from .serializers.common import ComicSerializer
from .serializers.populated import ComicListSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly

# Path: /comics/
# Methods: GET, POST
class ComicListCreateView(OwnerListCreateView):
  queryset = Comic.objects.all()
  # .select_related()
  serializer_class = ComicSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return ComicListSerializer
    return ComicSerializer

# Path: /comics/:pk/
# Methods: GET, PUT, PATCH, DELETE
class ComicDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Comic.objects.all()
  permission_classes = [IsOwnerOrReadOnly]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return ComicListSerializer
    else: 
      return ComicSerializer

# Path: /comics/:pk/favourite/
# Methods: PUT, PATCH
class ComicFavView(UpdateAPIView):
  queryset = Comic.objects.all()
  serializer_class = ComicSerializer
  permission_classes = [IsAuthenticated]

  def patch(self, request, pk):
    comic = self.get_object()
    # print(request.user)
    # print('Favourited book?', request.user in comic.favourites.all())

    # if request.user in comic.favourites.all():
    #   comic.favourites.remove(request.user)
    #   comic.save()
    #   return Response(status=204)
    # else:
    #   comic.favourites.add(request.user)
    #   comic.save()
    #   return Response(status=201)

    if request.user in comic.favourites.all():
        comic.favourites.remove(request.user)
    else:
        comic.favourites.add(request.user)

    comic.save()
    serializer = ComicListSerializer(comic)
    return Response(serializer.data, status=201)