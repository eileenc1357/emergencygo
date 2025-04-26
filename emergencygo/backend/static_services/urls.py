from django.urls import path
from .views import EmergencyServicesListView

urlpatterns = [
    path('', EmergencyServicesListView.as_view(), name='emergency-service-list'),
]
