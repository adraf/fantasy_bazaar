from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
# from rest_framework import serializers
from .models import User
# from lib.permissions import IsOwnerOrReadOnly
from .serializers.common import RegistrationSerializer, ComicListUserSerializer, UserInfoSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegistrationSerializer

# TEST
class UserDetailView(RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  permission_classes = [IsAuthenticated]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      # print(self.request.user)
      return UserInfoSerializer
    return ComicListUserSerializer
