const express = require('express');
const CinemaController = require('../controllers/cinemaController');

const router = express.Router();
const cinemaController = new CinemaController();

router.get('/movies/import', cinemaController.importMovies.bind(cinemaController));
router.post('/showtimes', cinemaController.createShowtime.bind(cinemaController));
router.get('/showtimes/:showtimeId/seats', cinemaController.getAvailableSeats.bind(cinemaController));
router.post('/tickets', cinemaController.reserveTicket.bind(cinemaController));

module.exports = router;