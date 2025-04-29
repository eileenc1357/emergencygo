from django.urls import path
from .views import report_emergency

urlpatterns = [
    path('report-emergency/', report_emergency),
]