import React from 'react';
import StarRating from './StarRating';

const RecipeList = ({ recipes, onRate }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {recipes.map((recipe) => (
      <li key={recipe.id} className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        <div className="flex items-center justify-between">
          <StarRating rating={recipe.average_rating} onRate={(rating) => onRate(recipe.id, rating)} />
          <span className="text-sm text-gray-500">
            {recipe.average_rating ? recipe.average_rating.toFixed(1) : 'No ratings'}
          </span>
        </div>
      </li>
    ))}
  </ul>
);

export default RecipeList;
