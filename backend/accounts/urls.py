from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("profile/", views.user_profile, name="profile"),
    path(
        "password-reset/", views.password_reset_request, name="password_reset_request"
    ),
    path(
        "password-reset-confirm/<str:uid>/<str:token>/",
        views.password_reset_confirm,
        name="password_reset_confirm",
    ),
    path("csrf/", views.get_csrf_token, name="csrf_token"),
]
