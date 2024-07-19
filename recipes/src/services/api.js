const API_URL = 'http://localhost:8000/api';

export const fetchRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes/`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch recipes');
  }
  return response.json();
};

export const addRecipe = async (newRecipe) => {
  const response = await fetch(`${API_URL}/recipes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add recipe');
  }
  return response.json();
};

export const rateRecipe = async (recipeId, rating) => {
  const response = await fetch(`${API_URL}/recipes/${recipeId}/rate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: rating }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to rate recipe');
  }
  return response.json();
};
