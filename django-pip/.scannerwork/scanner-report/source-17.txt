from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Recipe(models.Model):
    Title = models.CharField(max_length=50)
    Description = models.CharField(max_length=400)
    Ingredients = models.CharField(max_length=300)
    image = models.CharField(max_length=50000)

class Commentaire(models.Model):
    text = models.CharField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

class Rating(models.Model):
    rate = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)






