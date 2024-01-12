from django.urls import path
from .views import ComicListCreateView, ComicDetailView, ComicFavView

urlpatterns = [
  path('', ComicListCreateView.as_view()),
  path('<int:pk>/', ComicDetailView.as_view()),
  path('<int:pk>/favourite/', ComicFavView.as_view())
]