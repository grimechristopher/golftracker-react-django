from django.shortcuts import render
from rest_framework import viewsets, permissions, filters

from rest_framework.pagination import PageNumberPagination

from .models import GolferUser, Course, Hole, Tee, TeeColor, Round, Score, CourseRating, CoursePicture
from .serializers import GolferUserSerializer, CourseSerializer, CourseDetailSerializer, HolesSerializer, TeesSerializer, TeeColorsSerializer, RoundsListSerializer, RoundDetailSerializer, ScoreSerializer, CourseRatingListSerializer, CoursePictureListSerializer 

# Create your views here.
class GolferUserViewSet(viewsets.ModelViewSet):
    #permission_classes = (AllowAny,)
    serializer_class = GolferUserSerializer
    queryset = GolferUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if (self.request.user.is_active):
            return GolferUser.objects.select_related().filter(pk=self.request.user.id)

class CourseListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

    # Dont paginate if we dont ask for paginated data
    #def paginate_queryset(self, queryset, request, view=None):
    def paginate_queryset(self, queryset, request, view=None):
        if getattr(request, 'get_all', False):
            return None

        return super().paginate_queryset(queryset, request, view)

class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = CourseListPagination

    serializer_class = CourseSerializer

    #def get_queryset(self):
    queryset = Course.objects.all()
    search_fields = ['name', 'city', 'state']
    filter_backends = (filters.SearchFilter,)
        #coursefilter = self.request.query_params.get('coursefilter')
        #if coursefilter is not None:
        #    queryset = queryset.filter(course__name=coursefilter)
        #return queryset

    #def get_queryset(self):
    #    queryset = self.queryset
    #    coursefilter = self.request.query_params.get('search')
    #    query_set = queryset
    #    if coursefilter is not None:
    #        query_set = queryset.filter(course__name=coursefilter)
    #    return query_set

    # Get course details if a specific course is requested /courses/id
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseSerializer

class HoleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    serializer_class = HolesSerializer
    queryset = Hole.objects.all()

class TeeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    serializer_class = TeesSerializer
    queryset = Tee.objects.all()

class TeeColorViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    serializer_class = TeeColorsSerializer
    queryset = TeeColor.objects.all()


class RoundViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = RoundsListSerializer  

    def get_queryset(self):
        if (self.request.user.is_active):
            return Round.objects.select_related().filter(created_by=self.request.user)

    # Get round details if a specific round is requested
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RoundDetailSerializer
        return RoundsListSerializer

class ScoreViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    serializer_class = ScoreSerializer 
    queryset = Score.objects.all() 

class CourseRatingViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    #filter_backends = (filters.SearchFilter,) # possibly not the way I should get all ratings related to single course
    #search_fields = ['id',]

    serializer_class = CourseRatingListSerializer 
    #queryset = CourseRating.objects.all() 
    def get_queryset(self):
        if (self.request.user.is_active):
            return CourseRating.objects.select_related().filter(rated_by=self.request.user)

class CoursePictureViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    #filter_backends = (filters.SearchFilter,) # possibly not the way I should get all ratings related to single course
    #search_fields = ['id',]

    serializer_class = CoursePictureListSerializer 
    queryset = CoursePicture.objects.all() 

    def perform_destroy(self, instance):
        if (instance.uploaded_by == self.request.user):
            instance.delete()
