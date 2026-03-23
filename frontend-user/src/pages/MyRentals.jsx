import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

const parseExpiryDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d;
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const [, day, month, year] = match;
  const d2 = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(d2.getTime()) ? null : d2;
};

function MyRentals() {
  const { rentals } = useCart();
  const now = new Date();

  // Locations actives (non expirées)
  const activeRentals = rentals.filter((rental) => {
    const expiry = parseExpiryDate(rental.expiryDate);
    if (!expiry) return true;
    return expiry.getTime() > now.getTime();
  });

  // Locations expirées
  const expiredRentals = rentals.filter((rental) => {
    const expiry = parseExpiryDate(rental.expiryDate);
    if (!expiry) return false;
    return expiry.getTime() <= now.getTime();
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Mes locations</h1>

        {/* Locations actives */}
        {activeRentals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Actives ({activeRentals.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {activeRentals.map((rental) => {
                const expiry = parseExpiryDate(rental.expiryDate);
                const daysLeft = expiry
                  ? Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                  : null;

                return (
                  <div key={rental.id} className="group relative">
                    <Link to={`/movie/${rental.movieId}`}>
                      <img
                        src={rental.poster}
                        alt={rental.title}
                        className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="mt-2">
                        <h3 className="font-semibold truncate">{rental.title}</h3>
                        <p className="text-sm text-green-400">
                          {daysLeft !== null
                              ? `Expire dans ${daysLeft} jour(s)`
                              : "Expire bientôt"}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Locations expirées */}
        {expiredRentals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-400">
              Expirées ({expiredRentals.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {expiredRentals.map((rental) => (
                <div key={rental.id} className="opacity-50">
                  <img
                    src={rental.poster}
                    alt={rental.title}
                    className="w-full rounded-lg grayscale"
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold truncate">{rental.title}</h3>
                    <p className="text-sm text-red-400">Expiré</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aucune location */}
        {rentals.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 mx-auto mb-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <p className="text-2xl text-gray-400 mb-6">Aucune location pour le moment</p>
            <Link to="/">
              <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition">
                Découvrir des films
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyRentals;
