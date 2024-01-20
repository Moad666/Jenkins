from django.urls import path,include
from .views import *

urlpatterns = [
    path('recipe-count/', getCountRecipe, name='recipe-count'),
    path('user-count/', getCountUsers, name='user-count'),
    path('comment-count/', getCountComments, name='comment-count'),
    path('rating-count/', getCountRating, name='rating-count'),
]