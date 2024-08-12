from django.db import models
from django.contrib.auth.models import User
import uuid

class TaskComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    task = models.ForeignKey("Task", on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - {self.task.title}'

class Task(models.Model):
    status_choices = (
        ('INCOMPLETE', 'incomplete'),
        ('INPROGRESS', 'in-progress'),
        ('COMPLETED', 'completed'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="task_creator")
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=status_choices, default='INCOMPLETE')
    assigned_members = models.ManyToManyField(User, related_name="assigned_tasks")
    comments = models.ManyToManyField('TaskComment')

    def __str__(self):
        return f'{self.creator.username} - {self.title}'