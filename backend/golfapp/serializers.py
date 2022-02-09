from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from pytz import timezone

from rest_auth.registration.serializers import RegisterSerializer

from .models import COLOR_CHOICES, GolferUser, Course, Hole, Tee, TeeColor, Round, Score, CourseRating, CoursePicture

## Serializers for each model. Will allow me to Create, Update, Delete

class GolferUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GolferUser
        fields = ['id', 'url', 'username', 'email', 'gender']

class CoursePictureListSerializer(serializers.ModelSerializer):
    # Required to set the active user to uploaded_by field
    uploaded_by = serializers.PrimaryKeyRelatedField(queryset=GolferUser.objects.all(), default=serializers.CurrentUserDefault())

    class Meta:
        model = CoursePicture
        fields = ('id', 'uploaded_by', 'image', 'course', 'is_featured' )

class FeaturedCoursePictureListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePicture
        fields = ('image',)
        depth = 1

class CourseSerializer(serializers.ModelSerializer):
    #course_image = FeaturedCoursePictureListSerializer(many=True,) 
    course_image = CoursePictureListSerializer(many=True, required=False, read_only=True ) 
    # I really want to only expose the single course_image for this course with is_featured == True
    # Need to work on that

    class Meta:
        model = Course
        fields = ('url', 'id', 'name', 'city', 'state', 'tee_colors', 'course_image')

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
    course_image = CoursePictureListSerializer(many=True,)

    class Meta:
        model = Course
        fields = ('id', 'name', 'city', 'state','tee_colors', 'holes', 'rating_average', 'rating_count', 'course_image' )

class RegistrationSerializer(RegisterSerializer):
    GENDER_CHOICES = ( ('MALE', 'Male'),
                     ('FEMALE', 'Female'), )

    gender = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.gender = self.validated_data.get('gender', '')

        user.save(update_fields=['gender'])

class RoundsListSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ', input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'])
    course_details = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Round
        fields = ('url', 'id', 'name', 'created_on', 'tee_color', 'course', 'course_details' )

    def create(self, validated_data):
        # add the current User to the validated_data dict and call
        # the super method which basically only creates a model
        # instance with that data
        validated_data['created_by'] = self.context['request'].user
        return super(RoundsListSerializer, self).create(validated_data)

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id', 'round', 'hole', 'strokes')

class RoundDetailSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S.%fZ', input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'])
    course = CourseDetailSerializer(read_only=True)
    tee_color = TeeColorsSerializer(read_only=True)
    scores = ScoreSerializer(many=True,)

    class Meta:
        model = Round
        fields = ('id', 'name', 'tee_color', 'course', 'created_on', 'scores')

class CourseRatingListSerializer(serializers.ModelSerializer):
    #rated_by = serializers.Field(default=serializers.CurrentUserDefault())
    #rated_by = serializers.PrimaryKeyRelatedField(read_only=True,)
    rated_by = serializers.PrimaryKeyRelatedField(queryset=GolferUser.objects.all(), default=serializers.CurrentUserDefault())

    class Meta:
        model = CourseRating
        fields = ('id', 'rated_by', 'course', 'rating')

    #def perform_create(self, serializer):
    #    serializer.save(rated_by=self.request.user)

    #def perform_update(self, serializer):
    #    serializer.save(rated_by=self.request.user)

    #def perform_create(self, serializer, **kwargs): 
    #    kwargs['rated_by'] = self.request.user.id
    #    serializer.save(**kwargs)

