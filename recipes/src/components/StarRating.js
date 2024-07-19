import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRate }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRate(ratingValue)}
              className="hidden"
            />
            <Star
              size={24}
              className={`cursor-pointer transition-colors duration-200 ${
                ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              fill={ratingValue <= (hover || rating) ? 'currentColor' : 'none'}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
