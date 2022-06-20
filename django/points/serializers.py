from rest_framework import serializers
from django.db.models import Count
from django.contrib.auth.models import User
from .models import Category, Path, Point, Report, Profile, VisitedPoints


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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class PointSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Point
        fields = '__all__'


class VisitedPointsInPointSerializer(serializers.ModelSerializer):    

    class Meta:
        model = VisitedPoints
        fields = '__all__'


class PointAndVisitedSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    visited_points = serializers.SerializerMethodField()
    
    def get_visited_points(self, obj):
        print('-'*30)
        print(self.context)
        user = self.context['request'].user
        return VisitedPointsInPointSerializer(obj.visited_points.filter(user=user.id), many=True).data
    
    class Meta:
        model = Point
        fields = '__all__'


class PathSerializer(serializers.ModelSerializer):
    points = PointSerializer(many=True, read_only=True)

    class Meta:
        model = Path
        fields = '__all__'

class PathAndVisitedSerializer(serializers.ModelSerializer):
    # points = PointAndVisitedSerializer(many=True, read_only=True)
    points = serializers.SerializerMethodField()

    def get_points(self, obj):
        if self.context:
            print('THere is a context!!!!')
            return PointAndVisitedSerializer(obj.points, many=True, context=self.context).data
        else: 
            return PointSerializer(obj.points, many=True).data
    class Meta:
        model = Path
        fields = '__all__'


class VisitedPointsSerializer(serializers.ModelSerializer):
    point = PointSerializer(read_only=True)

    def create(self, validated_data):
        visited_point = VisitedPoints.objects.create(**validated_data)
        return visited_point

    class Meta:
        model = VisitedPoints
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
