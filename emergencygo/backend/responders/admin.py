from django.contrib import admin
from .models import Responder, EmergencyAlert

@admin.register(Responder)
class ResponderAdmin(admin.ModelAdmin):
    list_display = ('user', 'responder_type', 'is_verified')
    list_filter = ('responder_type', 'is_verified')
    search_fields = ('user__username', 'license_number')

@admin.register(EmergencyAlert)
class EmergencyAlertAdmin(admin.ModelAdmin):
    list_display = ('emergency', 'responder', 'status', 'received_at')
    list_filter = ('status',)
    raw_id_fields = ('emergency', 'responder')