from rest_framework import serializers
from django.db.models import Count
from django.contrib.auth.models import User
from .models import Path, Point, Report, Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

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

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})
        report = Report.objects.create(**validated_data)
        return report

    def update(self, validated_data):
        user = self.context['request'].user
        validated_data.update({'user': user})
        report = Report.objects.update(**validated_data)
        return report

    class Meta:
        model = Report
        fields = '__all__'
