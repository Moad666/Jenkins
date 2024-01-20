from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'

class CommentaireSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Commentaire
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField()
    class Meta : 
        model = Recipe
        fields = '__all__'
    def get_comment_count(self, obj):
        return obj.commentaire_set.count()

class RatingSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Rating
        fields = '__all__'

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
