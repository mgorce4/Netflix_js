import { useState } from "react";
function MovieFilter({ movies, onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  // Extraire la liste unique des genres (gère les films multi-genres)
  const genres = Array.from(
    new Set(
      movies
        .flatMap((m) =>
          Array.isArray(m.genre) ? m.genre : m.genre ? [m.genre] : []
        )
        .map((g) => g.trim())
    )
  );

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === "all") {
      onFilter(movies);
    } else {
      const filtered = movies.filter((m) => {
        if (Array.isArray(m.genre)) {
          return m.genre.some((g) => g && g.trim() === genre);
        }
        return m.genre && m.genre.trim() === genre;
      });
      onFilter(filtered);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6 px-4">
      <button
        onClick={() => handleGenreChange("all")}
        className={`px-4 py-1 rounded-lg font-medium border border-transparent transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          selectedGenre === "all"
            ? "bg-primary text-white"
            : "bg-gray-900 text-gray-200 hover:bg-gray-700 border-gray-700"
        }`}
      >
        Tous
      </button>
      {genres.map((genre, index) => (
        <button
          key={`${genre}-${index}`}
          onClick={() => handleGenreChange(genre)}
          className={`px-4 py-1 rounded-lg font-medium border border-transparent transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            selectedGenre === genre
              ? "bg-primary text-white"
              : "bg-gray-900 text-gray-200 hover:bg-gray-700 border-gray-700"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
export default MovieFilter;