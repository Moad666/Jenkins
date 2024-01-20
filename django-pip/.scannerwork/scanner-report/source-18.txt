from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'

class CommentaireSerializer(serializers.ModelSerializer):
    #user = serializers.SerializerMethodField()
    class Meta : 
        model = Commentaire
        fields = '__all__'
    # def get_user(self, obj):
    #    return obj.user.username

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

