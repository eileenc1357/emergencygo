from rest_framework import serializers
from .models import Emergency  # assuming your model is called Emergency

class EmergencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Emergency
        fields = '__all__'  # or list specific fields ['id', 'location', 'type', etc.]