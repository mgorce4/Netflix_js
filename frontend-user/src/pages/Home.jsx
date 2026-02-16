import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieCarousel from "../components/movies/MovieCarousel";
import MovieFilter from "../components/movies/MovieFilter";
import Footer from "../components/layout/Footer";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        console.error("Erreur chargement films:", err);
        setMovies([]);
        setFilteredMovies([]);
      }
      setLoading(false);
    };
    loadMovies();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Aucun film disponible.</p>
          <p className="text-sm text-gray-400 mt-2">
            Vérifiez que le backend est démarré.
          </p>
        </div>
      </div>
    );
  }

  //first movie as hero movie
  const heroMovie = movies[0];
  //5 random movies for popular section
  const getRandomMovies = (movies, count) => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const popularMovies = getRandomMovies(movies, 5);
  // 5 science-fiction movies
  const sciFiMovies = movies
    .filter((movie) => movie.genre === "Science-Fiction")
    .slice(0, 5);
  // Recent movies (after 2010)
  const recentMovies = movies.filter((movie) => movie.year > 2010);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {heroMovie && <MovieHero movie={heroMovie} />}
      <div className="w-full max-w-none">
        <div className="sticky top-0 z-30 bg-gray-900 pt-8 pb-2">
          <MovieFilter movies={movies} onFilter={setFilteredMovies} />
        </div>
        <div className="mb-4">
          <MovieCarousel title="Films disponibles" movies={filteredMovies} />
        </div>
      </div>
      <div className="relative z-10">
        <MovieList title="Films populaires" movies={popularMovies} />
        <MovieList title="Science-Fiction" movies={sciFiMovies} />
        <MovieCarousel title="Films récents" movies={recentMovies} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
