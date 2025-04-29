from django.db import models


from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class EmergencyReport(models.Model):
    EMERGENCY_TYPE_CHOICES = [
        ('fire', 'Fire'),
        ('medical', 'Medical Emergency'),
        ('crime', 'Crime'),
        ('accident', 'Accident'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emergency_type = models.CharField(max_length=50, choices=EMERGENCY_TYPE_CHOICES, default='other')  # 🔥 ADD THIS
    severity = models.IntegerField(default=5)  
    latitude = models.FloatField()
    longitude = models.FloatField()
    details = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.emergency_type} ({self.severity})"