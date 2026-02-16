import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(cors({
 origin: process.env.CLIENT_URL || 'http://localhost:3000',
 credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Route de test
app.get('/api/health', (req, res) => {
 res.json({
 status: 'OK',
 message: 'API Netfilm is running',
 timestamp: new Date().toISOString()
 });
});

// Route pour récupérer les films
app.get('/api/movies', async (req, res) => {
 try {
   const moviesPath = join(__dirname, '../../data', 'movies.json');
   const data = await readFile(moviesPath, 'utf-8');
   const movies = JSON.parse(data);
   res.json(movies);
 } catch (error) {
   console.error('Error reading movies.json:', error);
   res.status(500).json({ error: 'Failed to load movies' });
 }
});

// Démarrer le serveur
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
 console.log(`Environment: ${process.env.NODE_ENV}`);
});