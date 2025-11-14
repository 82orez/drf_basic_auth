from rest_framework import serializers

# from django.contrib.auth.models import User
from .models import CustomUser
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            "username",
            "email",
            "password",
            "password_confirm",
            "first_name",
            "last_name",
        )

    @staticmethod
    def validate_email(value):
        """이메일 중복 체크"""
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("이미 사용중인 이메일입니다.")
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Invalid credentials")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled")
            attrs["user"] = user
        else:
            raise serializers.ValidationError("Must include username and password")

        return attrs


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    @staticmethod
    def validate_email(value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "No user is associated with this email address"
            )
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(validators=[validate_password])
    new_password_confirm = serializers.CharField()

    def validate(self, attrs):
        if attrs["new_password"] != attrs["new_password_confirm"]:
            raise serializers.ValidationError("Passwords don't match")
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "first_name", "last_name", "date_joined")
        read_only_fields = ("id", "date_joined")
