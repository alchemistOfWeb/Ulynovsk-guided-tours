from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Point, Path
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework import viewsets, status, permissions, generics
from rest_framework.views import APIView
from .serializers import PathSerializer, PointSerializer
from django.middleware.csrf import get_token
# Create your views here.


@api_view(['GET'])
def csrf(request):
    return Response({'csrfToken': get_token(request)})
    

class PathViewSet(viewsets.ViewSet):
    queryset = Path.objects
    serializer_class = PathSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def filter_queryset(self, queryset):
        for backend in self.filter_backends:
            queryset = backend().filter_queryset(self.request, queryset, view=self)

        return queryset

    def list(self, request):
        serializer = self.serializer_class(self.filter_queryset(self.queryset), many=True)
        ctx = {'paths': serializer.data}
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
