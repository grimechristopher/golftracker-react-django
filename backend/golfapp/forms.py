from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import GolferUser

class GolferUserCreationForm(UserCreationForm):

    class Meta:
        model = GolferUser
        fields = ('username', 'email', 'gender')

class GolferUserChangeForm(UserChangeForm):

    class Meta:
        model = GolferUser
        fields = ('username', 'email', 'gender')