from django.contrib import admin
from .models import CustomUser
from django.utils.html import format_html

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_staff', 'is_superuser', 'id_photo_tag')

    def id_photo_tag(self, obj):
        # Debugging: log the file path or None
        print(f"ID Photo: {obj.id_photo}")  # This will show None if there's no file
        if obj.id_photo and hasattr(obj.id_photo, 'url'):  # Check if there's a file and URL exists
            return format_html('<img src="{}" style="max-height: 100px;" />', obj.id_photo.url)
        return "No Photo"
    id_photo_tag.short_description = 'Photo ID'

