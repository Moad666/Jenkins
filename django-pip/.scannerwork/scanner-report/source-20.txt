from django.urls import path,include
from .views import *

urlpatterns = [
    path('logout/',logOut, name="logout"),
    path('user_profile/',user_profile, name="user_profile"),
    path('is_superuser/', IsSuperuserView.as_view(), name='is_superuser'),

    # Recipes
    path('create_recipe/', RecipeListCreateView.as_view(), name='create_recipe'),
    path('list_recipe/', RecipeAllListView.as_view(), name='list_recipe'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('recipesupdate/<int:pk>/', RecipeUpdate.as_view(), name='recipe-update'),
    path('recipesbyid/<int:pk>/', RecipeById.as_view(), name='recipe-byid'),
    path('countRecipe/', RecipeCountView.as_view(), name='recipe-count'),

    # Users
    path('create_user/', UserListCreateView.as_view(), name='create_user'),
    path('list_user/', UserAllListView.as_view(), name='list_user'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('userbyid/<int:pk>/', UserById.as_view(), name='user-byid'),
    path('usersupdate/<int:pk>/', UserUpdate.as_view(), name='user-update'),
    path('countUser/', UserCountView.as_view(), name='user-count'),
    path('get_authenticated_user/', AuthenticatedUserView.as_view(), name='get_authenticated_user'),

    # Comments
    path('create_comment/', CommentListCreateView.as_view(), name='create_comment'),
    path('list_comment/', CommentAllListView.as_view(), name='list_comment'),
    path('commentbyid/<int:pk>/', CommentById.as_view(), name='comment-byid'),
    path('recipe_comments/<int:recipe_id>/', RecipeCommentsView.as_view(), name='recipe-comments'),
    path('countComment/', CommentCountView.as_view(), name='comment-count'),
    path('count_comment_recipe/<int:recipe_id>/', RecipeCommentCountAPI, name='count_comment_recipe'),

    # Rating
    path('create_rate/', RatingListCreateView.as_view(), name='create_rate'),
    path('countRating/', RatingCountView.as_view(), name='rating-count'),

    # Search
    path('search/', search_recipes, name='search_recipes'),



]
