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

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_emergency(request, pk):
    try:
        emergency = EmergencyReport.objects.get(pk=pk)
        emergency.delete()
        return Response({'message': 'Emergency deleted successfully!'})
    except EmergencyReport.DoesNotExist:
        return Response({'error': 'Emergency not found.'}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def emergencies_nearby(request):
    try:
        lat = float(request.query_params.get('lat'))
        lon = float(request.query_params.get('lon'))
        radius = 0.05  # about 5km

        south = lat - radius
        north = lat + radius
        west = lon - radius
        east = lon + radius

        emergencies = EmergencyReport.objects.filter(
            latitude__gte=south,
            latitude__lte=north,
            longitude__gte=west,
            longitude__lte=east,
        )

        return Response({'count': emergencies.count()})
    except Exception as e:
        return Response({'error': str(e)}, status=400)