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
    
class ListTasksAPIView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def get(self, request):
        user = self.request.user
        tasks_created = Task.objects.filter(creator=user)
        tasks_created = self.serializer_class(tasks_created, many=True)
        tasks_assigned = Task.objects.filter(assigned_members=user)
        tasks_assigned = self.serializer_class(tasks_assigned, many=True)
        data = {
            'tasks_created': tasks_created.data,
            'tasks_assigned': tasks_assigned.data,
            }
        return Response(data=data, status=200)

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