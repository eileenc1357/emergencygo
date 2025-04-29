from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from knox import views as knox_views
from emergencygo.views import ban_user, AdminUserViewSet
from users import urls as users_urls  # Include the user URLs
from django.conf import settings
from django.conf.urls.static import static

# Create router and register viewsets
router = DefaultRouter()
router.register('admin-tools/users', AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth and session management
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

    # Admin actions
    path('admin-tools/ban_user/', ban_user, name='ban_user'),
    path('', include(router.urls)),  # Admin user management via router

    # Password reset
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

    # App-specific APIs
    path('api/users/', include('users.urls')),
    path('api/emergencies/', include('emergencies.urls')),
    path('api/responders/', include('responders.urls')),
    path('api/emergency-services/', include('static_services.urls')),
    path('emergency/', include('emergencyreport.urls')),

    # Redundant but allowed for legacy support — `users/` and root both include users.urls
    path('users/', include('users.urls')),
    path('', include(users_urls)),
]

# Static media support in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
