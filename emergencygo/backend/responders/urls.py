from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResponderViewSet, EmergencyAlertViewSet

router = DefaultRouter()
router.register(r'responders', ResponderViewSet)
router.register(r'alerts', EmergencyAlertViewSet, basename='alert')

urlpatterns = [
    path('', include(router.urls)),
]