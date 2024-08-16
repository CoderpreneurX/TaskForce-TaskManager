from .models import Task, TaskComment
from rest_framework.serializers import ModelSerializer
from authentication.serializers import UserSerializer


class TaskCommentSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = TaskComment
        fields = "__all__"
        extra_kwargs = {
            "user": {"required": False},
            "task": {"required": False},
        }


class TaskSerializer(ModelSerializer):
    comments = TaskCommentSerializer(many=True, read_only=True)
    assigned_members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = "__all__"
        extra_kwargs = {"creator": {"required": False}}
