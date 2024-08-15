from datetime import timedelta
from .apps import AuthenticationConfig

app_name = AuthenticationConfig.name

simple_jwt_settings = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

def apply_configurations(globals_dict: dict):
    installed_apps = globals_dict.get('INSTALLED_APPS')
    installed_apps.append(app_name)
    installed_apps.append('corsheaders')

    middlewares = globals_dict.get('MIDDLEWARE')
    middlewares.append('corsheaders.middleware.CorsMiddleware')

    globals_dict['SIMPLE_JWT'] = simple_jwt_settings

    globals_dict['CORS_ALLOW_ALL_ORIGINS'] = True
    globals_dict['CORS_ALLOW_CREDENTIALS'] = True

    globals_dict['EMAIL_BACKEND'] = 'django.core.mail.backends.console.EmailBackend'