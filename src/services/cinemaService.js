const { Movie, Category, Showtime, Ticket, sequelize, Sequelize } = require('../models');
const TmdbService = require('./tmdbService');

class CinemaService {
  constructor() {
    this.tmdbService = new TmdbService(process.env.TMDB_API_KEY);
  }

  async importMovies(categoryName = 'popular') {
    const movies = await this.tmdbService.getPopularMovies();

    let [category] = await Category.findOrCreate({
      where: { name: categoryName },
      defaults: { name: categoryName },
    });

    for (const movie of movies) {
      await Movie.findOrCreate({
        where: { title: movie.title },
        defaults: {
          title: movie.title,
          description: movie.overview,
          duration: 120,
          categoryId: category.id,
        },
      });
    }

    return { message: 'Películas importadas exitosamente' };
  }

  async createShowtime({ movieId, room, date, time, totalCapacity }) {
    const existingShowtime = await Showtime.findOne({
      where: { room, date, time },
    });
    if (existingShowtime) throw new Error('Ya existe una función en esta sala y horario');

    return await Showtime.create({
      movieId,
      room,
      date,
      time,
      totalCapacity,
      availableCapacity: totalCapacity,
    });
  }

  async getAvailableSeats(showtimeId) {
    const showtime = await Showtime.findByPk(showtimeId);
    if (!showtime) throw new Error('Función no encontrada');
    return showtime.availableCapacity;
  }

  async reserveTicket({ showtimeId, buyer }) {
    const transaction = await sequelize.transaction();
    try {
      const showtime = await Showtime.findByPk(showtimeId, {
        transaction,
        lock: sequelize.literal('FOR UPDATE'),
      });
      if (!showtime) throw new Error('Función no encontrada');
      if (showtime.availableCapacity <= 0) throw new Error('No hay sillas disponibles');

      const ticket = await Ticket.create(
        { showtimeId, buyer, status: 'reserved' },
        { transaction }
      );
      await showtime.update(
        { availableCapacity: showtime.availableCapacity - 1 },
        { transaction }
      );

      await transaction.commit();
      return ticket;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = CinemaService;