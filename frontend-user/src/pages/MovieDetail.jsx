import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/common/Breadcrumb';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart, rentMovie, isRented, isInCart, getRentalByMovieId } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Charger tous les films depuis l'API et trouver celui correspondant à l'ID
    fetch('/api/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur de chargement');
        }
        return res.json();
      })
      .then((data) => {
        const moviesArray = Array.isArray(data) ? data : data.movies || [];
        // Trouver le film avec l'ID correspondant (numérique ou MongoDB)
        const foundMovie = moviesArray.find((m) => {
          const movieId = m.id ?? m._id;
          return String(movieId) === String(id);
        });
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur chargement film:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const movieKey = movie ? (movie.id ?? movie._id) : null;
  const alreadyRented = movieKey ? isRented(movieKey) : false;
  const inCart = movieKey ? isInCart(movieKey) : false;
  const rentalInfo = movieKey ? getRentalByMovieId(movieKey) : null;

  const handleAddToCart = () => {
    if (!movie || inCart || alreadyRented) return;

    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    addToCart(movie);
  };

  const handleRentNow = () => {
    if (!movie || alreadyRented) return;

    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const result = rentMovie(movie);
    if (result?.success) {
      // On reste sur la page détail mais la bannière de location s'affichera
    }
  };


  const handleBackHome = () => {
    navigate('/');
  };

  // État de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary mx-auto mb-6"></div>
          <p className="text-xl text-white font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-4xl font-bold mb-4">Film introuvable</h1>
          <p className="text-gray-400 mb-6">
            Le film que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={handleBackHome} variant="primary">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  // Page du film
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Fil d'Ariane sous la navbar, sans espace */}
      <div className="w-full bg-black pt-16">
        <div className="container mx-auto px-4 md:px-12">
          <Breadcrumb
            items={[
              { label: 'Films', path: '/' },
              { label: movie.genre, path: `/?genre=${movie.genre}` },
              { label: movie.title }
            ]}
          />
        </div>
      </div>
      {/* Hero Section avec image de fond */}
      <div className="relative h-[70vh] w-full">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Contenu */}
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pt-0 pb-12">
          {/* Titre et informations en bas */}
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
              {movie.title}
            </h1>

            {/* Meta information */}
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <span className="bg-primary px-3 py-1 rounded text-sm font-bold text-white">
                {movie.rating}/10
              </span>
              <span className="text-gray-300 text-lg">{movie.year}</span>
              <span className="text-gray-300 text-lg">{movie.duration} min</span>
              <span className="border border-gray-500 px-3 py-1 text-sm rounded text-white">
                {movie.genre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Synopsis et bouton */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Synopsis</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {movie.description}
            </p>
            {alreadyRented && rentalInfo && rentalInfo.expiryDate && (() => {
              const d = new Date(rentalInfo.expiryDate);
              const isValid = !Number.isNaN(d.getTime());
              const label = isValid
                ? d.toLocaleDateString("fr-FR")
                : rentalInfo.expiryDate; // déjà formaté (ex: 21/02/2026)
              return (
                <div className="mb-6 inline-block bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded">
                  Film loué jusqu'au {label}
                </div>
              );
            })()}

            {/* Actions panier / location */}
            <div className="mb-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleRentNow}
                disabled={alreadyRented}
                className="flex-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                {alreadyRented ? 'Déjà loué' : `Louer maintenant pour ${movie.price}€`}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleAddToCart}
                disabled={inCart || alreadyRented}
                className="flex-1"
              >
                {alreadyRented
                  ? 'Déjà loué'
                  : inCart
                  ? 'Déjà dans le panier'
                  : 'Ajouter au panier'}
              </Button>
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Informations</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-gray-400 w-32">Genre:</span>
                  <span className="text-white font-semibold">{movie.genre}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">Année:</span>
                  <span className="text-white">{movie.year}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">Durée:</span>
                  <span className="text-white">{movie.duration} minutes</span>
                </div>
                <div className="flex">
                  <span className="text-gray-400 w-32">Note:</span>
                  <span className="text-yellow-400 font-bold">
                    {movie.rating}/10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale - Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;
