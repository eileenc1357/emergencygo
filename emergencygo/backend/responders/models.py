from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Responder(models.Model):
    RESPONDER_TYPES = [
        ('medical', 'Medical Responder'),
        ('police', 'Police Officer'),
        ('fire', 'Firefighter'),
        ('admin', 'Administrator'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    responder_type = models.CharField(max_length=20, choices=RESPONDER_TYPES)
    license_number = models.CharField(max_length=50, blank=True)
    is_verified = models.BooleanField(default=False)
    current_location = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.get_responder_type_display()} - {self.user.username}"

class EmergencyAlert(models.Model):
    responder = models.ForeignKey(Responder, on_delete=models.CASCADE)
    emergency = models.ForeignKey('emergencies.Emergency', on_delete=models.CASCADE)
    received_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')