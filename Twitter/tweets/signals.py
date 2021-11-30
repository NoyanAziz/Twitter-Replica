from django.db.models.signals import post_save, m2m_changed
from notifications.signals import notify

from users.models import User
from tweets.models import Tweet, Comment


def follow_handler(action, sender, instance, **kwargs):
    if action == "post_add":
        followed_user = kwargs["pk_set"]
        print(followed_user)
        try:
            user = User.objects.get(id__in=followed_user)
            notify.send(instance, verb=f"{instance.name} followed you", recipient=user)
        except User.DoesNotExist:
            pass


def tweet_handler(sender, instance, created, **kwargs):
    user = User.objects.filter(id__in=instance.author.followers.all())
    notify.send(instance, verb=f"{instance.author.name} just posted a tweet", recipient=user)


def comment_handler(sender, instance, created, **kwargs):
    user = User.objects.get(id=instance.tweet.author.id)
    notify.send(instance, verb=f"{instance.author} just commented on your tweet", recipient=user)


def likes_handler(action, sender, instance, **kwargs):
    if action == "post_add":
        liker = kwargs["pk_set"]
        try:
            user = User.objects.get(id__in=liker)
            notify.send(instance, verb=f"{user.name} liked your post", recipient=instance.author)
        except User.DoesNotExist:
            pass


m2m_changed.connect(follow_handler, sender=User.following.through)
m2m_changed.connect(likes_handler, sender=Tweet.likes.through)
post_save.connect(tweet_handler, sender=Tweet)
post_save.connect(comment_handler, sender=Comment)
