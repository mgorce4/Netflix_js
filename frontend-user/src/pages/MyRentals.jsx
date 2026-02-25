import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // On récupère les locations depuis localStorage (clé 'rentals')
    const stored = localStorage.getItem("rentals");
    if (stored) {
      setRentals(JSON.parse(stored));
    } else {
      setRentals([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Mes locations</h1>
        {rentals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-8 flex items-center justify-center">
              {/* Pellicule de film SVG */}
              <svg width="80" height="80" viewBox="0 0 64 64" fill="none">
                <rect x="8" y="16" width="48" height="32" rx="6" fill="#18181b" stroke="#e11d48" strokeWidth="3" />
                <circle cx="16" cy="32" r="4" fill="#e11d48" />
                <circle cx="32" cy="32" r="4" fill="#e11d48" />
                <circle cx="48" cy="32" r="4" fill="#e11d48" />
              </svg>
            </div>
            <div className="text-lg mb-6 text-gray-300">Aucune location pour le moment</div>
            <button
              className="bg-primary text-white font-bold px-6 py-3 rounded hover:bg-primary-dark transition-colors"
              onClick={() => navigate("/")}
            >
              Découvrir des films
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {rentals.map((movie) => (
                <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
                  <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                    </div>
                    <div className="text-gray-400 text-sm mt-2">Expire le: <span className="text-white">{movie.expiryDate ? movie.expiryDate : "??/??/????"}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRentals;
