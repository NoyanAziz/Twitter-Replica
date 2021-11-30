from django.contrib.auth import password_validation
from django.contrib.auth.base_user import BaseUserManager
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from users.models import User


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=50, required=True)
    password = serializers.CharField(required=True, write_only=True)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def create(self, validated_data):
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "name", "date_of_birth", "bio")


class UserAuthenticationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2)
    following = UserSerializer(many=True)

    class Meta:
        model = User
        fields = ("id", "email", "name", "profile_picture", "date_of_birth", "bio", "following", "is_active",
                  "is_admin")
        read_only_fields = ("id", "is_active", "is_admin")


class SignupSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=2)

    class Meta:
        model = User
        fields = ("id", "email", "password", "name", "date_of_birth", "bio")

    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if user:
            raise serializers.ValidationError("Email is already taken")
        return BaseUserManager.normalize_email(value)

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value





class SearchUsersSerializer(serializers.ModelSerializer):
    following = UserSerializer(many=True)

    class Meta:
        model = User
        fields = ("id", "profile_picture", "email", "name", "date_of_birth", "bio", "following")
