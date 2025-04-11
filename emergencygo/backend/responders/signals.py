from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Responder
from emergencies.models import Emergency

@receiver(post_save, sender=Emergency)
def create_emergency_alerts(sender, instance, created, **kwargs):
    if created:
        from .models import EmergencyAlert
        # Get responders within 10 miles (simplified example)
        nearby_responders = Responder.objects.filter(
            is_verified=True
        ).exclude(
            current_location__isnull=True
        )[:5]  # First 5 responders for demo
        
        for responder in nearby_responders:
            EmergencyAlert.objects.create(
                responder=responder,
                emergency=instance,
                status='pending'
            )