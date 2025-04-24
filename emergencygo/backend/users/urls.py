from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewset, LoginViewset, UserViewset

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')  # Register endpoint
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')

urlpatterns = [
    path('', include(router.urls)),  # Includes all router-generated URLs
]