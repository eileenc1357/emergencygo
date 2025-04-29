from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from django.shortcuts import get_object_or_404

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse
from users.models import BannedUser
import json

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or request.user.is_superuser)

# class AdminUserViewSet(viewsets.ViewSet):
#     permission_classes = [IsAdminUser]

#     def list(self, request):
#         users = CustomUser.objects.all()
#         serializer = CustomUserSerializer(users, many=True)
#         return Response(serializer.data)

#     def create(self, request):
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         user = get_object_or_404(CustomUser, pk=pk)
#         serializer = CustomUserSerializer(user)
#         return Response(serializer.data)

#     def update(self, request, pk=None):
#         user = get_object_or_404(CustomUser, pk=pk)
#         serializer = CustomUserSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def destroy(self, request, pk=None):
#         user = get_object_or_404(CustomUser, pk=pk)
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Safely delete ID photo if it exists
        if instance.id_photo:
            instance.id_photo.delete(save=False)

        # Delete the user
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def ban_user(request):
    try:
        data = request.data
        email = data.get('email')
        username = data.get('username')
        user_id = data.get('user_id')
        reason = data.get('reason', '')

        if not email or not username or not user_id:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id, email=email, username=username)
            user.is_active = False
            user.save()
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        BannedUser.objects.create(
            email=email,
            username=username,
            user_id=user_id,
            reason=reason
        )

        return Response({'message': 'User has been banned and deactivated'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)