import express from 'express';
import {
  createRental,
  getAllRentals,
  getMyRentals,
  cancelRental,
  getRentalStats
} from '../controllers/rental.controller.js';

const router = express.Router();

// Toutes les locations
router.get('/', getAllRentals);
// Locations de l'utilisateur connecté
router.get('/myrentals', getMyRentals);
// Statistiques
router.get('/stats', getRentalStats);
// Créer une location
router.post('/', createRental);
// Annuler une location
router.delete('/:id', cancelRental);

export default router;
