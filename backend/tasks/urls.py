from django.urls import path
from .views import CreateTaskAPIView, TaskRetrieveUpdateDestroyView, TaskCommentListCreateView, TaskCommentRetrieveUpdateDestroyView

urlpatterns = [
    path("create-task/", CreateTaskAPIView.as_view(), name="create-task"),
    path(
        "retrieve-update-delete-task/<uuid:pk>/",
        TaskRetrieveUpdateDestroyView.as_view(),
        name="retrieve-update-delete-task",
    ),
    path(
        "list-create-task-comments/<uuid:pk>/",
        TaskCommentListCreateView.as_view(),
        name="list-create-task-comment",
    ),
    path(
        "retrieve-update-delete-task-comment/<uuid:pk>/",
        TaskCommentRetrieveUpdateDestroyView.as_view(),
        name="create-task",
    ),
]
