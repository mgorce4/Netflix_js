import React, { useState, useRef } from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Met à jour le nombre de cartes par page et de pages totales
  const updatePages = () => {
    const container = scrollContainerRef.current;
    if (!container) {
      setCardsPerPage(1);
      setTotalPages(1);
      return;
    }
    const perPage = Math.floor(container.clientWidth / 208) || 1;
    setCardsPerPage(perPage);
    setTotalPages(Math.max(1, Math.ceil(movies.length / perPage)));
  };

  // Scroll handler (boutons)
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let newPage = currentPage + (direction === "left" ? -1 : 1);
    newPage = Math.max(0, Math.min(newPage, totalPages - 1));
    const scrollAmount = newPage * cardsPerPage * 208; // 192px card + 16px gap
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
    setCurrentPage(newPage);
  };

  // Met à jour l'état lors du scroll manuel
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const page = Math.round(container.scrollLeft / (cardsPerPage * 208));
    setCurrentPage(page);
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1,
    );
  };

  // Responsive: update scroll state on resize et au chargement
  React.useEffect(() => {
    updatePages();
    const handleResize = () => {
      updatePages();
      handleScroll();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [movies.length]);

  // Ajoute l'écouteur de scroll
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    // Initial state
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [cardsPerPage, movies.length]);

  return (
    <section className="py-4 relative group w-full max-w-none">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 px-8 w-full">{title}</h2>

      {/* Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black p-2 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-8 w-full"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Movie cards */}
        {movies.map((movie, idx) => (
          <div key={movie.id || idx} className="shrink-0 w-48">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Indicateur de position (par page) */}
      <div className="flex justify-center mt-2 mb-2 w-full">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 mx-1 rounded-full ${idx === currentPage ? "bg-red-600" : "bg-gray-500"} inline-block`}
          />
        ))}
      </div>

      {/* Right Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black p-2 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </section>
  );
}

export default MovieCarousel;
