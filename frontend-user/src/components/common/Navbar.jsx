import { useState } from 'react';
import SearchBar from './SearchBar';
function Navbar() {
  const [isScrolled, _setIsScrolled] = useState(false);

  // Note : useEffect sera vu au TP 03
  // Pour l'instant, version statique
  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
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
            <SearchBar/>
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors mr-2">
              <span className="text-sm font-bold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;