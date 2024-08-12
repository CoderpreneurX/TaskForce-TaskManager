from .apps import TasksConfig

app_name = TasksConfig.name

def apply_configurations(globals_dict):
    installed_apps = globals_dict.get('INSTALLED_APPS')
    installed_apps.append(app_name)