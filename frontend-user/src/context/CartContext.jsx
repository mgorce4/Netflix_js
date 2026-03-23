import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
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
  // Chargez et initialisez le panier et les locations
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    const parsed = storedCart ? JSON.parse(storedCart) : [];
    if (!Array.isArray(parsed)) return [];
    // Normaliser les IDs (id, _id, movieId)
    return parsed.map((item) => ({
      ...item,
      id: item.id ?? item.movieId ?? item._id,
    }));
  });
  const [rentals, setRentals] = useState(() => {
    const storedRentals = localStorage.getItem("rentals");
    const parsed = storedRentals ? JSON.parse(storedRentals) : [];
    return Array.isArray(parsed) ? parsed : [];
  });

  // Sauvegardez le panier et les locations à chaque modif
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("rentals", JSON.stringify(rentals));
  }, [rentals]);
  // Ajouter au panier
  const addToCart = (movie) => {
    const movieId = movie.id ?? movie._id;
    if (!movieId) return;

    if (!cart.some((item) => item.id === movieId)) {
      const normalizedMovie = { ...movie, id: movieId };
      setCart([...cart, normalizedMovie]);
    }
  };
  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart(cart.filter((item) => item.id !== movieId));
  };
  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };
  // Calculer le total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0);
  };
  // Nombre d'items
  const getCartCount = () => {
    return cart.length;
  };
  // Louer un film
  const rentMovie = (movie) => {
    const movieId = movie.id ?? movie._id;
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours
    const rental = {
      id: Date.now(),
      movieId,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };
    setRentals([...rentals, rental]);
    if (movieId) {
      removeFromCart(movieId);
    }
    return { success: true, rental };
  };
  // Louer tous les films du panier
  const rentAllInCart = () => {
    const newRentals = cart.map((movie) => {
      const rentalDate = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      return {
        id: Date.now() + Math.random(),
        movieId: movie.id ?? movie._id,
        title: movie.title,
        poster: movie.poster,
        price: movie.price,
        rentalDate: rentalDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
      };
    });
    setRentals([...rentals, ...newRentals]);
    clearCart();
    return { success: true, count: newRentals.length };
  };
  // Vérifier si un film est loué
  const isRented = (movieId) => {
    const now = new Date();
    return rentals.some((rental) => {
      if (rental.movieId !== movieId) return false;
      const expiry = parseExpiryDate(rental.expiryDate);
      if (!expiry) return true; // pas de date ou invalide => considéré actif
      return expiry.getTime() > now.getTime();
    });
  };
  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    const now = new Date();
    return rentals.find((rental) => {
      if (rental.movieId !== movieId) return false;
      const expiry = parseExpiryDate(rental.expiryDate);
      if (!expiry) return true;
      return expiry.getTime() > now.getTime();
    });
  };
  // Vérifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some((item) => item.id === movieId);
  };
  const value = {
    cart,
    rentals,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
