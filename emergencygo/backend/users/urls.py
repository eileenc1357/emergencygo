from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewset, LoginViewset, UserViewset, get_user_info

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')

urlpatterns = [
    path('', include(router.urls)),  # <- this gives you /register/, /login/, /users/
    path('me/', UserViewset.as_view({'get': 'current_user'}), name='current_user'),
    path('user-info/', get_user_info),
]
