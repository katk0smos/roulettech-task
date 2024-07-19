from django.urls import path
from .views import RecipeListCreate, rate_recipe

urlpatterns = [
    path('recipes/', RecipeListCreate.as_view(), name='recipe-list-create'),
    path('recipes/<int:recipe_id>/rate/', rate_recipe, name='rate-recipe'),
]
