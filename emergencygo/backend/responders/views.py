# responders/views.py
from rest_framework import viewsets
from .models import Responder, EmergencyAlert
from .serializers import ResponderSerializer, EmergencyAlertSerializer

class ResponderViewSet(viewsets.ModelViewSet):
    queryset = Responder.objects.all()
    serializer_class = ResponderSerializer

class EmergencyAlertViewSet(viewsets.ModelViewSet):
    queryset = EmergencyAlert.objects.all()
    serializer_class = EmergencyAlertSerializer