"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.static import serve
from django.conf import settings

from rest_framework import routers
from golfapp import views

router = routers.DefaultRouter()
router.register(r'users', views.GolferUserViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'holes', views.HoleViewSet)
router.register(r'tees', views.TeeViewSet)
router.register(r'teecolors', views.TeeColorViewSet)
router.register(r'rounds', views.RoundViewSet, basename='round')
router.register(r'scores', views.ScoreViewSet)
router.register(r'courseratings', views.CourseRatingViewSet, basename='course_ratings')
router.register(r'coursepictures', views.CoursePictureViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('auth/', include('rest_auth.urls')),    
    path('auth/register/', include('rest_auth.registration.urls')),

    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,}),
]
