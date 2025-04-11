from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmergencyViewSet

router = DefaultRouter()
router.register(r'emergencies', EmergencyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]