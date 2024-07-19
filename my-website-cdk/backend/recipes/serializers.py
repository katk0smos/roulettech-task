from rest_framework import serializers
from .models import Recipe, Rating

class RecipeSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'created_at', 'average_rating']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['value']
