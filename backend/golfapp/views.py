from django.shortcuts import render
from rest_framework import viewsets, permissions

from rest_framework.pagination import PageNumberPagination

from .models import GolferUser, Course, Hole, Tee, TeeColor, Round
from .serializers import GolferUserSerializer, CourseSerializer, CourseDetailSerializer, HolesSerializer, TeesSerializer, TeeColorsSerializer, RoundsListSerializer

# Create your views here.
class GolferUserViewSet(viewsets.ModelViewSet):
    #permission_classes = (AllowAny,)
    serializer_class = GolferUserSerializer
    queryset = GolferUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]

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
    queryset = Course.objects.all()

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
    #queryset = Round.objects.select_related().filter(created_by=request.user)
    #queryset = Round.objects.all()

    def get_queryset(self):
        if (self.request.user.is_active):
            return Round.objects.select_related().filter(created_by=self.request.user)

