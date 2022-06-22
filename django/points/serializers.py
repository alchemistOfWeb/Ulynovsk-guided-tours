from rest_framework import serializers
from django.db.models import Count
from django.contrib.auth.models import User
from .models import Category, Path, Point, PointInPath, Report, Profile, VisitedPoints


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
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
    visited = serializers.SerializerMethodField()
    
    def get_visited(self, obj):
        user = self.context['request'].user
        visited = VisitedPointsInPointSerializer(obj.visited_points.filter(user=user.id).first()).data
        return visited
    
    class Meta:
        model = Point
        fields = '__all__'


class PointInPathSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(read_only=True)
    # visited = serializers.SerializerMethodField()
    point = serializers.SerializerMethodField()

    def get_point(self, obj):
        if self.context:
            # return PointAndVisitedSerializer(obj.points, many=True, context=self.context).data
            return PointAndVisitedSerializer(obj.point, context=self.context).data
        else: 
            return PointSerializer(obj.point).data
    
    class Meta:
        model = PointInPath
        fields = '__all__'


# class PathSerializer(serializers.ModelSerializer):
#     points = PointSerializer(many=True, read_only=True)

#     class Meta:
#         model = Path
#         fields = '__all__'

class PathSerializer(serializers.ModelSerializer):
    # points = PointAndVisitedSerializer(many=True, read_only=True)
    points = serializers.SerializerMethodField(source="path_to_point")

    def get_points(self, obj):
        if self.context:
            # return PointAndVisitedSerializer(obj.points, many=True, context=self.context).data
            return PointInPathSerializer(obj.path_to_point, many=True, context=self.context).data
        else: 
            return PointSerializer(obj.path_to_point, many=True).data

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
