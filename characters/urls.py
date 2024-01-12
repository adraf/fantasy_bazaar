from django.urls import path
from .views import CharacterListCreateView, CharacterDetailView

urlpatterns = [
  path('', CharacterListCreateView.as_view()),
  path('<int:pk>/', CharacterDetailView.as_view())
]