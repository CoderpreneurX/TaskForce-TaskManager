from .models import Task, TaskComment
from rest_framework.serializers import ModelSerializer

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {
            'creator': {'required': False}
        }

class TaskCommentSerializer(ModelSerializer):
    class Meta:
        model = TaskSerializer
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}
        }