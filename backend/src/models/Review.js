import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Un seul review par utilisateur par film
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

// Statique pour calculer la note moyenne d'un film
reviewSchema.statics.getAverageRating = async function(movieId) {
  const result = await this.aggregate([
    { $match: { movie: mongoose.Types.ObjectId(movieId) } },
    { $group: { _id: '$movie', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  return result[0] ? { avgRating: result[0].avgRating, count: result[0].count } : { avgRating: null, count: 0 };
};

const Review = mongoose.model('Review', reviewSchema);
export default Review;
