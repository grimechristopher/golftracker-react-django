from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import Group

from .models import GolferUser, Course, Hole, Tee, TeeColor
from .serializers import GolferUserSerializer, CourseSerializer, CourseDetailSerializer, HolesSerializer, TeesSerializer, TeeColorsSerializer

# Create your views here.
class GolferUserViewSet(viewsets.ModelViewSet):
    #permission_classes = (AllowAny,)
    serializer_class = GolferUserSerializer
    queryset = GolferUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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