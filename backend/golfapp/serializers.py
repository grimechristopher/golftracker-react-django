from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from django.contrib.auth.models import Group

from .models import GolferUser, Course, Hole, Tee, TeeColor

class GolferUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GolferUser
        fields = ['url', 'username', 'email', 'gender', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('url', 'id', 'name', 'city', 'state',)

class TeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tee
        fields = ('id', 'color', 'yards', 'hole')
        validators = [UniqueTogetherValidator(
                queryset=Tee.objects.all(), 
                fields=['color', 'hole'], 
                message="This hole already has a tee with this color.",
            )
        ]

class HolesSerializer(serializers.ModelSerializer):
    #tees = TeesSerializer(many=True,)

    class Meta:
        model = Hole
        fields = ('id', 'number', 'name', 'course', 'mens_par', 'womens_par')
        validators = [UniqueTogetherValidator(
                queryset=Hole.objects.all(), 
                fields=['number', 'course'], 
                message="This course already has a hole with this number.",
            )
        ]

class HoleDetailSerializer(serializers.ModelSerializer):
    tees = TeesSerializer(many=True,)

    class Meta:
        model = Hole
        fields = ('id', 'number', 'name', 'course', 'mens_par', 'womens_par', 'tees' )

class TeeColorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeeColor
        fields = ('id', 'name', 'color' )

class CourseDetailSerializer(serializers.ModelSerializer):
    holes = HoleDetailSerializer(many=True,)
    tee_colors = TeeColorsSerializer(many=True,)

    class Meta:
        model = Course
        fields = ('id', 'name', 'city', 'state','tee_colors', 'holes' )

class TeeColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeColor
        fields = ('id', 'name', 'color')