from rest_framework import status
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from django.shortcuts import render
from rest_framework import viewsets, permissions 
from .serializers import * 
from .models import * 
from rest_framework.response import Response 
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny

User = get_user_model()

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                _, token = AuthToken.objects.create(user)
                return Response({
                    "user": {
                        "id": user.id,
                        "email": user.email
                    },
                    "token": token
                })
            else:
                return Response({"error": "Invalid email or password"}, status=401)
        else:
            return Response(serializer.errors, status=400)

class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        email = request.data.get('email')

        # Check if the email is banned BEFORE validating
        if email and BannedUser.objects.filter(email=email).exists():
            return Response({"error": "You are permanently banned from this service."}, status=403)

        print("Request Data:", request.data)  # Debugging: Check what data is coming in

        # Check if id_photo is in the request data (debugging)
        if 'id_photo' not in request.data:
            print("No id_photo field in the request data.")
        
        # Now, validate the data with the serializer
        serializer = self.serializer_class(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid():
            # Save the new user instance (including the file)
            user = serializer.save()

            # Debugging: Check if the user and photo are saved correctly
            print("Created user:", user)
            print("User ID Photo URL:", user.id_photo.url if user.id_photo else "No Photo")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    # Endpoint to list all users (existing functionality)
    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # New method to get logged-in user info
    def current_user(self, request):
        user = request.user
        user_data = {
            'id': user.id,
            'email': user.email,
            'id_photo_url': user.id_photo.url if user.id_photo else None,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser
        }
        return Response(user_data)


# Existing view for fetching user data based on query parameters (email, username, or user_id)
def get_user_info(request):
    email = request.GET.get('email')
    user_id = request.GET.get('user_id')

    try:
        user = CustomUser.objects.get(
            **{k: v for k, v in {'email': email, 'id': user_id}.items() if v}
        )
        return JsonResponse({
            'email': user.email,
            'id': user.id,
            'id_photo_url': user.id_photo.url if user.id_photo else None
        })
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)



class LoginAPI(KnoxLoginView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return super().post(request)