from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from rest_auth.registration.serializers import RegisterSerializer

from .models import COLOR_CHOICES, GolferUser, Course, Hole, Tee, TeeColor

## Serializers for each model. Will allow me to Create, Update, Delete

class GolferUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GolferUser
        fields = ['id', 'url', 'username', 'email', 'gender']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('url', 'id', 'name', 'city', 'state', 'tee_colors')

class TeeColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeColor
        fields = ('id', 'name', 'color' )

class TeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tee
        fields = ('id', 'tee_color', 'yards', 'hole')
        validators = [UniqueTogetherValidator(
                queryset=Tee.objects.all(), 
                fields=['tee_color', 'hole'], 
                message="This hole already has a tee with this color.",
            )
        ]

class HolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hole
        fields = ('id', 'number', 'name', 'course', 'mens_par', 'womens_par', 'tees')
        validators = [UniqueTogetherValidator(
                queryset=Hole.objects.all(), 
                fields=['number', 'course'], 
                message="This course already has a hole with this number.",
            )
        ]

## Nested Serializers. Will allow one large api request when looking at a course. 
## Will mean less Api calls and cleaner data in react

class TeeColorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeColor
        fields = ('id', 'name', 'color' )

class TeeDetailSerializer(serializers.ModelSerializer):
    tee_color = TeeColorDetailSerializer()

    class Meta:
        model = Tee
        fields = ('id', 'tee_color', 'yards', 'hole')

class HoleDetailSerializer(serializers.ModelSerializer):
    tees = TeeDetailSerializer(many=True,)

    class Meta:
        model = Hole
        fields = ('id', 'number', 'name', 'mens_par', 'womens_par', 'tees' )

class CourseDetailSerializer(serializers.ModelSerializer):
    holes = HoleDetailSerializer(many=True,)
    tee_colors = TeeColorsSerializer(many=True,)

    class Meta:
        model = Course
        fields = ('id', 'name', 'city', 'state','tee_colors', 'holes' )

class RegistrationSerializer(RegisterSerializer):

    GENDER_CHOICES = ( ('MALE', 'Male'),
                     ('FEMALE', 'Female'), )

    gender = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.gender = self.validated_data.get('gender', '')

        user.save(update_fields=['gender'])