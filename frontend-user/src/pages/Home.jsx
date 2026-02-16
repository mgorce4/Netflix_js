
import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import MovieHero from '../components/movies/MovieHero';
import MovieList from '../components/movies/MovieList';
import MovieCarousel from '../components/movies/MovieCarousel';
import Footer from '../components/layout/Footer';
import moviesData from '../../../data/movies.json';

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMovies(moviesData);
            setLoading(false);
        };
        loadMovies();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
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
    const sciFiMovies = movies.filter(movie => movie.genre === 'Science-Fiction').slice(0, 5);
    // Recent movies (after 2010)
    const recentMovies = movies.filter(movie => movie.year > 2010);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            {heroMovie && <MovieHero movie={heroMovie} />}
            <div className="relative -mt-32 z-10">
                <MovieList title="Films populaires" movies={popularMovies} />
                <MovieList title="Science-Fiction" movies={sciFiMovies} />
                <MovieCarousel title="Films récents" movies={recentMovies} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
