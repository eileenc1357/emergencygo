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
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]  # Enable web interface
    
    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        # This will show the form when visiting /register/ in browser
        serializer = RegisterSerializer()
        return Response(serializer.data)


class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self,request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)