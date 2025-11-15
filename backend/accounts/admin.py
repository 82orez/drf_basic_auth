from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    CustomUser 모델을 위한 관리자 클래스
    Django의 기본 UserAdmin을 상속받아 사용
    """

    # 목록 페이지에서 표시할 필드들
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
        "date_joined",
    )

    # 필터링 옵션
    list_filter = ("is_staff", "is_superuser", "is_active", "date_joined", "last_login")

    # 검색 가능한 필드들
    search_fields = ("username", "email", "first_name", "last_name")

    # 정렬 기본값
    ordering = ("-date_joined",)

    # 사용자 편집 페이지의 필드 그룹화
    fieldsets = UserAdmin.fieldsets

    # 새 사용자 추가 페이지의 필드들
    add_fieldsets = UserAdmin.add_fieldsets
