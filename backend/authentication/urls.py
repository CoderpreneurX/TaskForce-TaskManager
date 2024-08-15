from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserView, CreateUserProfileView, EditUserProfileView, RetrieveUserProfileView, ListUsersAPIView

urlpatterns = [
    path('user/register/', RegisterUserView.as_view(), name='register-user'),
    path('user/login/', TokenObtainPairView.as_view(), name="login-user"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh-token"),
    path('user/profile/register/', CreateUserProfileView.as_view(), name='create-user-profile'),
    path('user/profile/edit/', EditUserProfileView.as_view(), name='edit-user-profile'),
    path('user/profile/', RetrieveUserProfileView.as_view(), name='retrieve-user-profile'),
    path('list-users/', ListUsersAPIView.as_view(), name='list-users'),
]