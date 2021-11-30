from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from notifications.models import Notification
from rest_framework import viewsets, permissions, views, authentication, generics
from rest_framework.response import Response

from tweets.models import Tweet, Comment
from tweets.permissions import IsOwnerOrReadOnly
from tweets.serializers import TweetSerializer, CommentSerializer, NotificationsSerializer, FollowSerializer, \
    LikesSerializer
from users.models import User
from users.permissions import IsOwner
from users.serializers import UserAuthenticationSerializer


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class Likes(views.APIView):
    serializer_class = LikesSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request):
        serialized_tweet_id = self.serializer_class(data=request.data)
        serialized_tweet_id.is_valid(raise_exception=True)

        tweet_to_like = serialized_tweet_id.validated_data["tweet"]
        target_tweet = get_object_or_404(Tweet, pk=tweet_to_like)

        target_tweet.likes.add(request.user.id)
        liked_tweet_serialized = TweetSerializer(target_tweet)

        return Response(liked_tweet_serialized.data)

    def delete(self, request):
        serialized_tweet_id = self.serializer_class(data=request.data)
        serialized_tweet_id.is_valid(raise_exception=True)

        tweet_to_unlike = serialized_tweet_id.validated_data["tweet"]
        target_tweet = get_object_or_404(Tweet, pk=tweet_to_unlike)

        target_tweet.likes.remove(request.user.id)
        unliked_tweet_serialized = TweetSerializer(target_tweet)

        return Response(unliked_tweet_serialized.data)


class Follow(views.APIView):
    serializer_class = FollowSerializer

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serialized_user_id = self.serializer_class(data=request.data)
        serialized_user_id.is_valid(raise_exception=True)

        user_to_follow = serialized_user_id.validated_data["user_id"]
        get_object_or_404(User, pk=user_to_follow)

        if request.user.id != user_to_follow:
            current_user = User.objects.get(id=request.user.id)
            current_user.following.add(user_to_follow)
            following_user_serialized = UserAuthenticationSerializer(current_user)

            return Response(following_user_serialized.data)

        return HttpResponse("Cannot follow yourself")

    def delete(self, request):
        serialized_user = self.serializer_class(data=request.data)
        serialized_user.is_valid(raise_exception=True)

        user_to_follow = serialized_user.validated_data["user_id"]
        get_object_or_404(User, pk=user_to_follow)

        if request.user.id != user_to_follow:
            current_user = User.objects.get(id=request.user.id)
            current_user.following.remove(user_to_follow)
            following_user_serialized = UserAuthenticationSerializer(current_user)

            return Response(following_user_serialized.data)

        return HttpResponse("Cannot unfollow yourself")


class NewsFeed(generics.ListAPIView):
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.id)
        current_user = get_object_or_404(User, id=self.request.user.id)
        followed_tweets = Tweet.objects.filter(author_id__in=current_user.following.all())
        return followed_tweets


class UserTweets(generics.ListAPIView):
    serializer_class = TweetSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        print(self.request.user.id)
        user_tweets = Tweet.objects.filter(author_id=self.request.user.id)
        return user_tweets


class NotificationsView(generics.ListAPIView):
    serializer_class = NotificationsSerializer

    def get_queryset(self):
        current_user_notifications = Notification.objects.filter(recipient_id=self.request.user.id)
        return current_user_notifications
