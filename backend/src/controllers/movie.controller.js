import { title } from 'process';
import Movie from '../models/Movie.js';

//@desc Obtenir tous les films
//@route GET /api/movies
//@access Public
export const getAllMovies = async (req, res, next) => {
    try {
        const { search, genre, year, sort, page = 1, limit = 10 } = req.query;
        let filter = {};
        // Recherche sur titre ou description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        // Filtre genre
        if (genre) filter.genre = genre;
        // Filtre année
        if (year) filter.year = Number(year);
        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        // Construction de la requête
        let moviesQuery = Movie.find(filter);
        // Tri
        if (sort) moviesQuery = moviesQuery.sort({ [sort]: -1 });
        moviesQuery = moviesQuery.skip(skip).limit(Number(limit));
        // Exécution
        const movies = await moviesQuery;
        const total = await Movie.countDocuments(filter);
        res.json({ movies, total });
    } catch (error) {
        next(error);
    }
};


//@desc Obtenir un film par ID
//@route GET /api/movies/:id
//@access Public
export const getMovieById = async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
};
//@desc Créer un nouveau film
//@route POST /api/movies
//@access Private/Admin
export const createMovie = async (req, res, next) => {
    const movie = await Movie.create({
        title,
        description,
        poster,
        backdrop,
        genre,
        year,
        duration,
        price,
        rating
    });
};

//@desc Modifier un film
//@route PUT /api/movies/:id
//@access Private/Admin
export const updateMovie = async (req, res, next) => {
    const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        new: true, // Retourner le document modifié
        runValidators: true // Exécuter les validations
    }
    );
};

//@desc Supprimer un film
//@route DELETE /api/movies/:id
//@access Private/Admin
export const deleteMovie = async (req, res, next) => {
    await movie.deleteOne();
};

//@desc Obtenir les statistiques des films
//@route GET /api/movies/stats
//@access Private/Admin
export const getMovieStats = async (req, res, next) => {
    const totalRevenue = await Movie.aggregate([
    {
        $group: {
            _id: null,
            total: { $sum: { $multiply: ['$price', '$rentalCount'] } }
        }
    }
    ]);
};

//@desc Obtenir des films similaires
//@route GET /api/movies/:id/similar
//@access Public
export const getSimilarMovies = async (req, res, next) => {
    const similarMovies = await Movie.find({
        genre: { $in: movie.genre },
        _id: { $ne: movie._id }, // Exclure le film actuel
        isAvailable: true
    })
    .sort({ rating: -1 })
    .limit(6);
}
