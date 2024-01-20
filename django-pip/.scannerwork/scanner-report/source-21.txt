from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
from django.http import HttpResponse
from rest_framework.decorators import action
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework import generics
from .models import *
from django.contrib.auth.hashers import make_password

#--------------------------------------------------------------------------User
# Authentification
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()


# check if the user is superUser or not
class IsSuperuserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({'is_superuser': user.is_superuser})
        

# logout
@csrf_exempt # we dont need the token
def logOut(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})

# get user data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


#--------------------------------------------------------------------------Comments (CRUD)
#--------- Create Comment
class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Commentaire.objects.all()
    serializer_class = CommentaireSerializer
    authentication_classes = [] 
    permission_classes = []

#--------- List Comment
class CommentAllListView(generics.ListAPIView):
    queryset = Commentaire.objects.all()
    serializer_class = CommentaireSerializer
    authentication_classes = []
    permission_classes = []

#--------- Comment by id
class CommentById(generics.RetrieveAPIView):
    queryset = Commentaire.objects.all()
    serializer_class = CommentaireSerializer

#--------- Comment
class RecipeCommentsView(generics.ListAPIView):
    serializer_class = CommentaireSerializer
    def get_queryset(self):
        recipe_id = self.kwargs['recipe_id']
        return Commentaire.objects.filter(recipe_id=recipe_id)

#--------- Comments Count
class CommentCountView(generics.RetrieveAPIView):
    serializer_class = CommentaireSerializer
    def get_queryset(self):
        return Commentaire.objects.none()
    def get_object(self):
        return Commentaire.objects.count()
    def retrieve(self, request, *args, **kwargs):
        count = self.get_object()
        return Response({'comment_count': count})

#--------------------------------------------------------------------------Recipe (CRUD)
#--------- Create Recipe
class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = [] 
    permission_classes = []

#--------- List Recipe
class RecipeAllListView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = []
    permission_classes = []

#--------- Delete
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = []  # Disable authentication for this view
    permission_classes = []  # Disable permission checks (public access)

#--------- Update
class RecipeUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = []  # Disable authentication for this view
    permission_classes = []  # Disable permission checks (public access)

#--------- Recipe by Id
class RecipeById(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

#--------- Recipe Count
class RecipeCountView(generics.RetrieveAPIView):
    serializer_class = RecipeSerializer
    def get_queryset(self):
        return Recipe.objects.none()
    def get_object(self):
        return Recipe.objects.count()
    def retrieve(self, request, *args, **kwargs):
        count = self.get_object()
        return Response({'recipe_count': count})


#--------------------------------------------------------------------------User (CRUD)

#--------- Create User
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [] 
    permission_classes = []
    def perform_create(self, serializer):
        # Hash the password before saving the user
        hashed_password = make_password(serializer.validated_data.get('password'))
        serializer.validated_data['password'] = hashed_password
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#--------- List User
class UserAllListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

#--------- Delete
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [] 
    permission_classes = []
    def perform_update(self, serializer):
        # Hash the password if included in the update data
        password = serializer.validated_data.get('password')
        if password:
            hashed_password = make_password(password)
            serializer.validated_data['password'] = hashed_password

        serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

#--------- User by Id
class UserById(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#--------- Update
class UserUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [] 
    permission_classes = []
    def perform_update(self, serializer):
        # Hash the password if included in the update data
        password = serializer.validated_data.get('password')
        if password:
            hashed_password = make_password(password)
            serializer.validated_data['password'] = hashed_password

        serializer.save()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

#--------- User Count
class UserCountView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.none()
    def get_object(self):
        return User.objects.count()
    def retrieve(self, request, *args, **kwargs):
        count = self.get_object()
        return Response({'user_count': count})

#--------- User data authenticated
class AuthenticatedUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user  # Get the authenticated user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

#--------- Create Rating
class RatingListCreateView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = [] 
    permission_classes = []

#--------- Rating Count
class RatingCountView(generics.RetrieveAPIView):
    serializer_class = RatingSerializer
    def get_queryset(self):
        return Rating.objects.none()
    def get_object(self):
        return Rating.objects.count()
    def retrieve(self, request, *args, **kwargs):
        count = self.get_object()
        return Response({'rating_count': count})


#--------- Search
@api_view(['GET'])
@permission_classes([AllowAny])
def search_recipes(request):
    title_query = request.GET.get('Title', '')

    if not title_query:
        return Response({"detail": "Please provide a title for the search."}, status=400)

    queryset = Recipe.objects.filter(Title__icontains=title_query)
    serializer = RecipeSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def RecipeCommentCountAPI(request, recipe_id):
    try:
        # Retrieve the specific recipe by ID and annotate with comment count
        recipe = Recipe.objects.annotate(comment_count=models.Count('commentaire')).get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=404)

    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)

# Set the queryset attribute for the permission class
RecipeCommentCountAPI.queryset = Recipe.objects.all()