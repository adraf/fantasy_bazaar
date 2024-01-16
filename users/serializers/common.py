from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  class Meta:
    model = User
    fields = '__all__'
    extra_fields = ['password_confirmation']

  def validate(self, data):
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise serializers.ValidationError('These passwords do not match.')
    return data

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user

class ComicListUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username']

# Single User
class UserInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'first_name', 'last_name']

# All Users
class AllUserInfoSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']
