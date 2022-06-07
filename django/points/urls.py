from unicodedata import name
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import (
    csrf,  PathViewSet
)

router = DefaultRouter()

router.register(r'paths', PathViewSet, basename='path_list')

urlpatterns = [
    # path('profile/', current_profile, name='profile'), # get|patch|delete
    path('csrf/', csrf, name='get_csrf'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
] + router.urls
