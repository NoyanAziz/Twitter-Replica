from notifications.models import Notification
from rest_framework import serializers

from tweets.models import Tweet, Comment
from users.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "body", "image", "author", "tweet", "created_on"]


class TweetSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    likes = serializers.StringRelatedField(many=True, read_only=True)
    comments = serializers.StringRelatedField(many=True, required=False)

    class Meta:
        model = Tweet
        fields = ["id", "body", "image", "author", "likes", "comments", "created_on"]


class LikesSerializer(serializers.Serializer):
    tweet = serializers.IntegerField(required=True)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def create(self, validated_data):
        return super().create(validated_data)


class FollowSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def create(self, validated_data):
        return super().create(validated_data)


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
        depth = 0
