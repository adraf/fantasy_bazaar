from django.urls import path
from .views import RegisterView, UserDetailView, AllUserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', TokenObtainPairView.as_view()),
  path('user/<int:pk>/', UserDetailView.as_view()),
  path('users/', AllUserDetailView.as_view())
]