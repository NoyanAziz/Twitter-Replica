from django.contrib.auth import logout, authenticate
from django.core.exceptions import ImproperlyConfigured
from django.http import Http404
from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework import filters, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .permissions import IsOwner
from .models import User
from .serializers import UserAuthenticationSerializer, LoginSerializer, SignupSerializer, SearchUsersSerializer


class SearchUsersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = SearchUsersSerializer

    permission_classes = [AllowAny, ]
    filter_backends = (filters.SearchFilter, )
    search_fields = ["name", "=email"]


class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = serializers.Serializer
    serializer_classes = {
        "login": LoginSerializer,
        "signup": SignupSerializer,
    }

    @action(methods=["POST", ], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(**serializer.validated_data)
        if user is None:
            raise serializers.ValidationError("Invalid username/password. Please try again!")

        authenticated_user_serialized = UserAuthenticationSerializer(user)

        return Response(data=authenticated_user_serialized.data, status=status.HTTP_200_OK)

    @action(methods=["POST", ], detail=False)
    def signup(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.create_user(**serializer.validated_data)
        signed_up_user_serialized = UserAuthenticationSerializer(user)

        return Response(data=signed_up_user_serialized.data, status=status.HTTP_201_CREATED)

    @action(methods=["POST", ], detail=False)
    def logout(self, request):
        logout(request)
        response_message = {"success": 'Successfully logged out'}

        return Response(data=response_message, status=status.HTTP_200_OK)

    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]

        return super().get_serializer_class()


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserAuthenticationSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self):
        try:
            return User.objects.get(pk=self.request.user.id)
        except User.DoesNotExist:
            raise Http404
