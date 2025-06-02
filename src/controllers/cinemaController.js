const CinemaService = require('../services/cinemaService');

class CinemaController {
  constructor() {
    this.cinemaService = new CinemaService();
  }

  async importMovies(req, res) {
    try {
      const { category } = req.query;
      await this.cinemaService.importMovies(category || 'popular');
      res.status(200).json({ message: 'Películas importadas exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createShowtime(req, res) {
    try {
      const showtime = await this.cinemaService.createShowtime(req.body);
      res.status(201).json(showtime);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAvailableSeats(req, res) {
    try {
      const seats = await this.cinemaService.getAvailableSeats(req.params.showtimeId);
      res.status(200).json({ availableSeats: seats });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async reserveTicket(req, res) {
    try {
      const ticket = await this.cinemaService.reserveTicket(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CinemaController;