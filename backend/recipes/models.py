from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    total_ratings = models.IntegerField(default=0)
    total_rating_value = models.IntegerField(default=0)

    @property
    def average_rating(self):
        if self.total_ratings > 0:
            return self.total_rating_value / self.total_ratings
        return 0

class Rating(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ratings')
    value = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
