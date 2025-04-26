from rest_framework import serializers
from .models import EmergencyServices

class EmergencyServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyServices
        fields = ['id', 'name', 'phone_number', 'description']
