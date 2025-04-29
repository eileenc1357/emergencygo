from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from knox import views as knox_views
from emergencygo.views import ban_user, AdminUserViewSet
from users import urls as users_urls  # Include the user URLs
from .views import AdminUserViewSet  # Admin user viewset for admin panel

# Create a new router for admin views
router = DefaultRouter()
router.register('admin-tools/users', AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('', include(users_urls)),  # include users.urls
    path('', include(router.urls)),  # include admin router
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('admin-tools/ban_user/', ban_user, name='ban_user'),
]