from unicodedata import name
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import (
    csrf, current_profile, create_user, PathViewSet, ReportViewSet
)

router = DefaultRouter()

router.register(r'paths', PathViewSet, basename='path_list')
router.register(r'reports', ReportViewSet, basename='reports_list')

urlpatterns = [
    path('profile/', current_profile, name='profile'), 
    path('create_user/', create_user, name='create_user'), 
    path('csrf/', csrf, name='get_csrf'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
] + router.urls
