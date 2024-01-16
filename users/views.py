from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
# from rest_framework import serializers
from .models import User
from .serializers.common import RegistrationSerializer, ComicListUserSerializer, UserInfoSerializer, AllUserInfoSerializer
from django.contrib.auth import get_user_model
from lib.views import OwnerListCreateView
User = get_user_model()

# Create your views here.
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegistrationSerializer

# Path: /user/:pk/
# Methods: GET, PUT, PATCH, DELETE
class UserDetailView(RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  permission_classes = [IsAuthenticated]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return UserInfoSerializer
    return ComicListUserSerializer
  
# See all users
class AllUserDetailView(ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = AllUserInfoSerializer
