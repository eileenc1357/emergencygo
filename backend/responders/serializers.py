from rest_framework import serializers
from .models import Responder, EmergencyAlert
from emergencies.serializers import EmergencySerializer

class ResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responder
        fields = ['id', 'user', 'responder_type', 'is_verified', 'current_location']
        read_only_fields = ['is_verified']

class EmergencyAlertSerializer(serializers.ModelSerializer):
    emergency = EmergencySerializer(read_only=True)
    responder = ResponderSerializer(read_only=True)
    
    class Meta:
        model = EmergencyAlert
        fields = ['id', 'emergency', 'responder', 'received_at', 'status']