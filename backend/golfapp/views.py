from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import Group

from .models import GolferUser, Course, Hole, Tee, TeeColor
from .serializers import GolferUserSerializer, GroupSerializer, CourseSerializer, CourseDetailSerializer, HolesSerializer, TeesSerializer, TeeColorsSerializer

# Create your views here.
class GolferUserViewSet(viewsets.ModelViewSet):
    #permission_classes = (AllowAny,)
    serializer_class = GolferUserSerializer
    queryset = GolferUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    #permission_classes = [IsAuthenticatedOrReadOnly]
#    permission_classes = (AllowAny,)
    #authentication_classes = [TokenAuthentication,]
#    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseSerializer

class HoleViewSet(viewsets.ModelViewSet):
    serializer_class = HolesSerializer
    queryset = Hole.objects.all()

class TeeViewSet(viewsets.ModelViewSet):
    serializer_class = TeesSerializer
    queryset = Tee.objects.all()

class TeeColorViewSet(viewsets.ModelViewSet):
    serializer_class = TeeColorsSerializer
    queryset = TeeColor.objects.all()