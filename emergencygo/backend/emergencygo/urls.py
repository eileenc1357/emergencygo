from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import (
    RegisterViewset, 
    LoginViewset,
    UserViewset,
)

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include(router.urls)),  # All auth endpoints
    
    # Password reset
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]