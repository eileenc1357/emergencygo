from django.urls import path
from .views import report_emergency, list_emergencies, delete_emergency, emergencies_nearby

urlpatterns = [
    path('report-emergency/', report_emergency),
    path('list-emergencies/', list_emergencies),
    path('delete-emergency/<int:pk>/', delete_emergency),
    path('emergencies-nearby/', emergencies_nearby),
]