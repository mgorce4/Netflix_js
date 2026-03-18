import Rental from '../models/rental.model.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

// @desc Obtenir des recommandations personnalisées
// @route GET /api/rentals/recommendations
// @access Private
export const getRecommendations = async (req, res, next) => {
    try {
        // Simule un utilisateur connecté (à remplacer par req.user._id quand l'auth sera en place)
        const userId = req.user?._id || 'fakeUserId';
        // 1. Obtenir les locations de l'utilisateur
        const rentals = await Rental.find({ user: userId }).populate('movie');
        if (!rentals.length) {
            // Si pas d'historique, recommander les films les plus populaires
            const popularMovies = await Movie.getPopularMovies(10);
            return res.json({ recommendations: popularMovies });
        }
        // 2. Compter les genres préférés
        const genreCount = {};
        rentals.forEach(rental => {
            if (rental.movie && Array.isArray(rental.movie.genre)) {
                rental.movie.genre.forEach(genre => {
                    genreCount[genre] = (genreCount[genre] || 0) + 1;
                });
            }
        });
        // 3. Trier les genres par préférence
        const sortedGenres = Object.entries(genreCount)
            .sort((a, b) => b[1] - a[1])
            .map(([genre]) => genre);
        // 4. Obtenir les IDs des films déjà loués
        const rentedMovieIds = rentals.map(r => r.movie?._id?.toString()).filter(Boolean);
        // 5. Recommander des films de ces genres non encore loués
        let recommendations = [];
        for (const genre of sortedGenres) {
            const movies = await Movie.find({
                genre: genre,
                _id: { $nin: rentedMovieIds },
                isAvailable: true
            })
                .sort({ rating: -1, rentalCount: -1 })
                .limit(5);
            recommendations.push(...movies);
            if (recommendations.length >= 10) break;
        }
        // Si pas assez de recommandations, compléter avec les plus populaires non loués
        if (recommendations.length < 10) {
            const more = await Movie.find({
                _id: { $nin: rentedMovieIds },
                isAvailable: true
            })
                .sort({ rentalCount: -1, rating: -1 })
                .limit(10 - recommendations.length);
            recommendations.push(...more);
        }
        // Limiter à 10 recommandations
        recommendations = recommendations.slice(0, 10);
        res.json({ recommendations });
    } catch (error) {
        next(error);
    }
};

// @desc Louer un film
// @route POST /api/rentals
// @access Private
export const createRental = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        // Simule un utilisateur connecté (à remplacer par req.user._id quand l'auth sera en place)
        const userId = req.user?._id || 'fakeUserId';
        // Vérifier que le film existe
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        // Créer la location
        const rental = new Rental({
            user: userId,
            movie: movieId,
            status: 'active',
            rentedAt: new Date(),
        });
        await rental.save();
        res.status(201).json(rental);
    } catch (error) {
        next(error);
    }
};

//@desc Obtenir les locations d’un utilisateur
//@route GET /api/rentals/my-rentals
//@access Private
export const getMyRentals = async (req, res, next) => {
    try {
        // Simule un utilisateur connecté (à remplacer par req.user._id quand l'auth sera en place)
        const userId = req.user?._id || 'fakeUserId';
        const { status } = req.query;
        let filter = { user: userId };
        if (status) filter.status = status;
        const rentals = await Rental.find(filter).populate('movie');
        res.json(rentals);
    } catch (error) {
        next(error);
    }
};

// @desc Obtenir toutes les locations (admin)
// @route GET /api/rentals
// @access Private/Admin
export const getAllRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find().populate('movie user');
        res.json(rentals);
    } catch (error) {
        next(error);
    }
};

// @desc Annuler une location
// @route DELETE /api/rentals/:id
// @access Private
export const cancelRental = async (req, res, next) => {
    try {
        const rentalId = req.params.id;
        // Simule un utilisateur connecté (à remplacer par req.user._id quand l'auth sera en place)
        const userId = req.user?._id || 'fakeUserId';
        const rental = await Rental.findOne({ _id: rentalId, user: userId });
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }
        await Rental.deleteOne({ _id: rentalId });
        res.json({ message: 'Rental cancelled' });
    } catch (error) {
        next(error);
    }
};
// @desc Obtenir les statistiques des locations
// @route GET /api/rentals/stats
// @access Private/Admin
export const getRentalStats = async (req, res, next) => {
    try {
        // Statistiques simples: nombre total, actifs, terminés
        const total = await Rental.countDocuments();
        const active = await Rental.countDocuments({ status: 'active' });
        const completed = await Rental.countDocuments({ status: 'completed' });
        res.json({ total, active, completed });
    } catch (error) {
        next(error);
    }
};
