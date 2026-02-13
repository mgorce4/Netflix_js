import Button from '../common/Button';

// Couleurs par genre
const genreColors = {
  'Action': 'bg-red-500',
  'Comédie': 'bg-yellow-500',
  'Drame': 'bg-blue-500',
  'Science-Fiction': 'bg-purple-500',
  'Horreur': 'bg-orange-500',
  'Thriller': 'bg-gray-500'
};

import { useState } from 'react';

function MovieDescription({ description }) {
  // Variable d'état pour savoir si la description est étendue ou non
  const [isExpanded, setIsExpanded] = useState(false);

  // Fonction pour basculer l'état
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <p className={isExpanded ? '' : 'line-clamp-2'}>{description} </p>
      <button onClick={toggleDescription} className="text-white/70 hover:text-white text-sm mt-1">
        {isExpanded ? 'Voir moins' : 'Voir plus'}
      </button>
    </div>
  );
}


function MovieCard({ movie }) {
  // Like state
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(movie.likes || 0);

  // Fonction de gestion du like
  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
      {/* Image principale */}
      <div className="relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Badge de note */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-sm">
            ⭐ {movie.rating}
          </span>
        </div>

        {/* Badge de genre */}
        <div className={`absolute bottom-2 left-2 ${genreColors[movie.genre] || 'bg-gray-600'} px-3 py-1 rounded-full`}>
          <span className="text-white font-semibold text-xs">
            {movie.genre}
          </span>
        </div>
      </div>

      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

        <div className="flex items-center space-x-3 mb-3 text-sm">
          <span className="text-green-400 font-semibold">{movie.rating}/10</span>
          <span className="text-gray-400">{movie.year}</span>
          <span className="text-gray-400">{movie.duration} min</span>
        </div>

        <div className="text-sm text-gray-300 mb-4">
          <MovieDescription description={movie.description} />
        </div>

        {/* Like button */}
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded mb-2 transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-500 text-white/80'}`}
        >
          {isLiked ? '❤' : '🤍'} {likes} likes
        </button>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" className="flex-1">
            ▶ Louer {movie.price}€
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            + Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;