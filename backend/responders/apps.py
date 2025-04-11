from django.apps import AppConfig

class RespondersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'responders'

    def ready(self):
        # Import signals only after app is fully loaded
        from . import signals  # No need to actually use the import