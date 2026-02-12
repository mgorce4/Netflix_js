import { useState } from 'react';
function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className="relative">
            {/* Affiche le champ de recherche avec l'icône à droite */}
            {isOpen ? (
                <div className="flex items-center bg-gray-900 border border-red-700 rounded-xl px-3 w-80 h-10">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher un film..."
                        className="bg-transparent outline-none text-white flex-1 placeholder-gray-300 text-lg px-2 h-full"
                        autoFocus
                    />
                    <button className="ml-2 text-white hover:text-red-500 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            ) : (
                <button onClick={() => setIsOpen(true)} className="hover:text-gray-300 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            )}
        </div>
    );
}
export default SearchBar;