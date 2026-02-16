import { useState, useRef, useEffect } from "react";

function SearchBar({ movies, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.length >= 2 && Array.isArray(movies)) {
      const filtered = movies
        .filter(
          (movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm, movies]);

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    setIsOpen(false);
    if (onSearch) onSearch(movie);
    console.log("Film sélectionné :", movie);
  };

  const handleFocus = () => {
    if (searchTerm.length >= 2 && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          placeholder="Rechercher un film..."
          className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
        />
        <svg
          className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0"
              onMouseDown={() => handleSelect(movie)}
            >
              {movie.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">
                  {movie.title}
                </div>
                <div className="text-xs text-gray-400">
                  {movie.year} • {movie.genre}
                </div>
              </div>
            </div>
          ))}
          {suggestions.length === 0 && (
            <div className="px-4 py-2 text-gray-400">Aucun résultat</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
