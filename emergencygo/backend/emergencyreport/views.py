from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmergencyReportSerializer
from .models import EmergencyReport
from .serializers import EmergencyReportSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_emergency(request):
    serializer = EmergencyReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({'message': 'Emergency reported successfully!'})
    else:
        return Response(serializer.errors, status=400)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_emergencies(request):
    emergencies = EmergencyReport.objects.all().order_by('-timestamp')  # newest first
    serializer = EmergencyReportSerializer(emergencies, many=True)
    return Response(serializer.data)