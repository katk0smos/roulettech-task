from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Recipe, Rating
from .serializers import RecipeSerializer, RatingSerializer
from django.core.exceptions import ValidationError

class RecipeListCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

@api_view(['POST'])
def rate_recipe(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        try:
            rating_value = serializer.validated_data['value']
            Rating.objects.create(recipe=recipe, value=rating_value)
            recipe.total_ratings += 1
            recipe.total_rating_value += rating_value
            recipe.save()
            return Response(RecipeSerializer(recipe).data)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
