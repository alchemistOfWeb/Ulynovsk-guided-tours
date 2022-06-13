from rest_framework import serializers
from django.db.models import Count
from django.contrib.auth.models import User
from .models import Path, Point, Report, Profile



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class PointSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Point
        fields = '__all__'


class PathSerializer(serializers.ModelSerializer):
    points = PointSerializer(many=True, read_only=True)

    class Meta:
        model = Path
        fields = '__all__'


class ReportSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Path
        fields = '__all__'
