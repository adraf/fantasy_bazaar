from django.urls import path
from .views import AuthorListCreateView, AuthorDetailView
urlpatterns = [
  path('', AuthorListCreateView.as_view()),
  path('<int:pk>/', AuthorDetailView.as_view())
]

