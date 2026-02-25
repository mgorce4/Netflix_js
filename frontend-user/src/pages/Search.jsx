import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import MovieCard from "../components/movies/MovieCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const GENRES = [
  "Tous les genres",
  "Action",
  "Comédie",
  "Drame",
  "Science-Fiction",
  "Horreur",
  "Thriller",
];

const SORT_OPTIONS = [
  { label: "Note", value: "rating" },
  { label: "Année", value: "year" },
  { label: "Titre", value: "title" },
];

export default function Search() {
  const query = useQuery();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("Tous les genres");
  const [sort, setSort] = useState("rating");

  const q = query.get("q") || "";

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  const searchResults = useMemo(() => {
    let results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(q.toLowerCase())
    );
    if (genre !== "Tous les genres") {
      results = results.filter((movie) => movie.genre === genre);
    }
    if (sort === "rating") {
      results = results.slice().sort((a, b) => b.rating - a.rating);
    } else if (sort === "year") {
      results = results.slice().sort((a, b) => b.year - a.year);
    } else if (sort === "title") {
      results = results.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    return results;
  }, [q, genre, sort, movies]);

  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold text-white mb-2">
          Résultats pour {q ? `"${q}"` : '""'}
        </h1>
        <p className="text-gray-400 mb-6">
          {loading
            ? "Chargement..."
            : `${searchResults.length} film(s) trouvé(s)`}
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded"
            value={genre}
            onChange={handleGenreChange}
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded"
            value={sort}
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {!loading && searchResults.length === 0 && (
          <div className="text-white mt-8">Aucun film trouvé.</div>
        )}
      </div>
    </div>
  );
}
