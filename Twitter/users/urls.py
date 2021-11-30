from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AuthViewSet, SearchUsersViewSet, ProfileView


router = DefaultRouter()
router.register(r"users", AuthViewSet, basename="users")
router.register(r"search-users", SearchUsersViewSet, basename="search-users")

urlpatterns = [
    path("", include(router.urls)),
    path("profile/", ProfileView.as_view(), name="profile"),
]
