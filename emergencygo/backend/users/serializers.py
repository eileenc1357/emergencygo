from rest_framework import serializers 
from .models import * 
from django.contrib.auth import get_user_model 
User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}  # This makes it show as a password field
    )
    email = serializers.EmailField(
        style={'input_type': 'email'}  # This helps with email input formatting
    )
    
    class Meta:
        model = User
        fields = ('email', 'password')