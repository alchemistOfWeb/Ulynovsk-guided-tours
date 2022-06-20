from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Point, Path, Report
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework import viewsets, status, permissions, generics
from rest_framework.views import APIView
from .serializers import (
    PathSerializer, PointSerializer, 
    ReportSerializer, UserSerializer, 
    ProfileSerializer, VisitedPointsSerializer,
    PathAndVisitedSerializer
)
from django.middleware.csrf import get_token
# Create your views here.


@api_view(['GET'])
def csrf(request):
    return Response({'csrfToken': get_token(request)})
    
@api_view(['GET'])
def current_profile(request):
    serializer = UserSerializer(request.user)
    return Response({'user': serializer.data})

@api_view(['GET'])
def detail_profile(request):
    vs_serializer = VisitedPointsSerializer(
        request.user.visited_points,
        many=True
    )
    return Response({'visited_places': vs_serializer.data})

@api_view(['POST'])
def add_visited_place(request):
    serializer = VisitedPointsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_user(request):
    u_serializer = UserSerializer(data=request.data)
    u_serializer.is_valid(raise_exception=True)
    u_serializer.save()
    return Response(u_serializer.data, status=status.HTTP_201_CREATED)


class PathViewSet(viewsets.ViewSet):
    queryset = Path.objects
    serializer_class = PathSerializer
    serializer_with_user_data = PathAndVisitedSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def filter_queryset(self, queryset):
    #     for backend in self.filter_backends:
    #         queryset = backend().filter_queryset(self.request, queryset, view=self)
    #     return queryset

    def list(self, request):
        if (request.user):
            print('hooooooooooo')
            serializer = self.serializer_with_user_data(
                self.queryset, 
                many=True, 
                context={'request': request}
            )
        else:
            serializer = self.serializer_class(self.queryset, many=True)

        ctx = {'paths': serializer.data}
        #     vs_serializer = VisitedPointsSerializer(
        #         request.user.visited_points,
        #         many=True
        #     )
        #     ctx.update({'visited_places': vs_serializer.data})
        
        return Response(data=ctx, status=status.HTTP_200_OK)

    def create(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(obj)
        ctx = {'path': serializer.data}
        return Response(data=ctx, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)

    def partial_update(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)

    def delete(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        obj.is_active = False
        obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReportViewSet(viewsets.ViewSet):
    queryset = Report.objects
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        serializer = self.serializer_class(self.queryset.filter(doshow=True), many=True)
        ctx = {'reports': serializer.data}
        return Response(data=ctx, status=status.HTTP_200_OK)

    def create(self, request):
        data = request.data
        data.update({'user': request.user})
        serializer = self.serializer_class(data=data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(obj)
        ctx = {'report': serializer.data}
        return Response(data=ctx, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(obj, data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)

    def partial_update(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_205_RESET_CONTENT)

    def delete(self, request, pk=None):
        obj = get_object_or_404(self.queryset, pk=pk)
        obj.is_active = False
        obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class PointViewSet(viewsets.ViewSet):
#     queryset = Path.objects
#     serializer_class = PointSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     # def list(self, request):
#     #     serializer = self.serializer_class(self.filter_queryset(self.queryset), many=True)
#     #     ctx = {'points': serializer.data}
#     #     return Response(data=ctx, status=status.HTTP_200_OK)

#     def create(self, request):
#         # data = {**request.data, '': section_pk}
#         data = request.data
#         serializer = self.serializer_class(data=data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     def retrieve(self, request, pk=None):
#         obj = get_object_or_404(self.queryset, pk=pk)
#         serializer = self.serializer_class(obj)
#         ctx = {'point': serializer.data}
#         return Response(data=ctx, status=status.HTTP_200_OK)

#     def update(self, request, pk=None):
#         obj = get_object_or_404(self.queryset, pk=pk)
#         serializer = self.serializer_class(obj, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(status=status.HTTP_205_RESET_CONTENT)

#     def partial_update(self, request, pk=None):
#         obj = get_object_or_404(self.queryset, pk=pk)
#         serializer = self.serializer_class(obj, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(status=status.HTTP_205_RESET_CONTENT)

#     def delete(self, request, pk=None):
#         obj = get_object_or_404(self.queryset, pk=pk)
#         obj.is_active = False
#         obj.save()
#         return Response(status=status.HTTP_204_NO_CONTENT)
