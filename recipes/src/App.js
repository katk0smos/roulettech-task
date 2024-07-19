import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import { fetchRecipes, addRecipe, rateRecipe } from './services/api';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await fetchRecipes();
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError(error.message);
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    try {
      await addRecipe(newRecipe);
      await loadRecipes();
      setShowForm(false);
      setError(null);
    } catch (error) {
      console.error('Error adding recipe:', error);
      setError(error.message);
    }
  };

  const handleRateRecipe = async (recipeId, rating) => {
    try {
      await rateRecipe(recipeId, rating);
      await loadRecipes();
      setError(null);
    } catch (error) {
      console.error('Error rating recipe:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600">My Recipe Book</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle size={20} />
            <span className="ml-2 hidden sm:inline">Add New Recipe</span>
          </button>
        </header>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <RecipeList recipes={recipes} onRate={handleRateRecipe} />
        {showForm && (
          <AddRecipeForm onAddRecipe={handleAddRecipe} onClose={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
};

export default App;
