from django.urls import path
from .views import report_emergency, list_emergencies

urlpatterns = [
    path('report-emergency/', report_emergency),
    path('list-emergencies/', list_emergencies),
]