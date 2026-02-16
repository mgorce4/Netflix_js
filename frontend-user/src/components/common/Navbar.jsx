
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../movies/SearchBar";


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Charger les films depuis l'API backend
  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMoviesData(data))
      .catch((err) => console.error("Erreur chargement films:", err));
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-black"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Partie gauche : logo + liens */}
          <div className="flex items-center space-x-8 flex-1 min-w-0">
            <h1 className="text-primary text-3xl font-bold tracking-tight whitespace-nowrap">
              NETFILM
            </h1>
            <ul className="hidden md:flex space-x-6">
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Films
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition-colors">
                  Mes locations
                </a>
              </li>
            </ul>
          </div>
          {/* Partie droite : searchbar + avatar */}
          <div className="flex items-center space-x-4 justify-end pr-2">
            <SearchBar movies={moviesData} />
            <div
              className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors mr-2"
              onClick={() => navigate("/login")}
              title="Se connecter"
            >
              <span className="text-sm font-bold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
