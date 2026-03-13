import Movie from '../models/Movie.js';

//@desc Obtenir tous les films
//@route GET /api/movies
//@access Public
export const getMovies = async (req, res, next) => {
    console.log("Get all movies");
};

//@desc Obtenir un film par ID
//@route GET /api/movies/:id
//@access Public
export const getMovieById = async (req, res, next) => {
    console.log("Get movie with ID:", req.params.id);
};

//@desc Modifier un film
//@route PUT /api/movies/:id
//@access Private/Admin
export const updateMovie = async (req, res, next) => {
    console.log("Update movie with ID:", req.params.id);
};

//@desc Supprimer un film
//@route DELETE /api/movies/:id
//@access Private/Admin
export const deleteMovie = async (req, res, next) => {
    console.log("Delete movie with ID:", req.params.id);
};

//@desc Obtenir les statistiques des films
//@route GET /api/movies/stats
//@access Private/Admin
export const getMovieStats = async (req, res, next) => {
    console
};
