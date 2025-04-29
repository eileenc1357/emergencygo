from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
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