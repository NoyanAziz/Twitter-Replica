from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.db import models

from Twitter.settings import AUTH_USER_MODEL


class UserManager(BaseUserManager):
    def create_user(self, email, name, date_of_birth, password, bio="", **kwargs):
        if not email:
            raise ValueError("Email not provided")

        user = self.model(
            email=email,
            name=name,
            date_of_birth=date_of_birth,
            bio=bio,
            **kwargs
        )

        user.set_password(password)

        try:
            user.save(using=self._db)
        except ValidationError:
            print("Unable to save user due to invalid fields")

        return user

    def create_superuser(self, email, name, date_of_birth, password, bio="", **kwargs):
        return self.create_user(
            email=email,
            name=name,
            date_of_birth=date_of_birth,
            bio=bio,
            password=password,
            is_admin=True,
            **kwargs
        )


class User(AbstractBaseUser):
    email = models.EmailField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    profile_picture = models.ImageField(blank=True, null=True)
    date_of_birth = models.DateField()
    bio = models.TextField(max_length=100, blank=True)

    following = models.ManyToManyField(AUTH_USER_MODEL, related_name="followers")

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "password", "date_of_birth"]

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin
