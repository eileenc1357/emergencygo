from rest_framework import generics
from .models import EmergencyServices
from .serializers import EmergencyServicesSerializer

class EmergencyServicesListView(generics.ListAPIView):
    queryset = EmergencyServices.objects.all()
    serializer_class = EmergencyServicesSerializer