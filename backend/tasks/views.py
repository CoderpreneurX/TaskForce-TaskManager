from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Task, TaskComment
from .serializers import TaskSerializer, TaskCommentSerializer

class CreateTaskAPIView(generics.CreateAPIView):
    queryset = Task.objects.all().order_by('-updated_at')
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(creator=user)
        return serializer
    
class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskCommentListCreateView(generics.ListCreateAPIView):
    queryset = TaskComment.objects.all()
    serializer_class = TaskCommentSerializer

    def perform_create(self, serializer):
        user = self.request.user
        task = Task.objects.get(pk=self.kwargs['pk'])
        comment = serializer.save(task=task, user=user)
        task.comments.add(comment)
        return serializer

class TaskCommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaskComment.objects.all()
    serializer_class = TaskCommentSerializer