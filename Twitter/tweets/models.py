from django.db import models

from Twitter.settings import AUTH_USER_MODEL


class Tweet(models.Model):
    body = models.TextField(max_length=130)
    image = models.ImageField(blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)

    author = models.ForeignKey(AUTH_USER_MODEL, related_name="tweets", on_delete=models.CASCADE)
    likes = models.ManyToManyField(AUTH_USER_MODEL, related_name="liked_tweets")

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return f"Tweet: {self.body} by {self.author}"


class Comment(models.Model):
    body = models.TextField(max_length=50)
    image = models.ImageField(blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)

    author = models.ForeignKey(AUTH_USER_MODEL, related_name="comments", on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return f"Comment: {self.body} by {self.author}"
