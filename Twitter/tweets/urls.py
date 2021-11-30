from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TweetViewSet, CommentViewSet, Likes, Follow, NewsFeed, NotificationsView, UserTweets

router = DefaultRouter()
router.register(r"tweets", TweetViewSet, basename="tweets")
router.register(r"comments", CommentViewSet, basename="comments")

urlpatterns = [
    path("", include(router.urls)),
    path("likes/", Likes.as_view(), name="likes"),
    path("follow/", Follow.as_view(), name="follow"),
    path("newsfeed/", NewsFeed.as_view(), name="newsfeed"),
    path("user-tweets/", UserTweets.as_view(), name="user-tweets"),
    path("notifications/", NotificationsView.as_view(), name="notifications")
]
