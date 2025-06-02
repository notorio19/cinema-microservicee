const CinemaService = require('../services/cinemaService');
const { Movie, Category, Showtime, sequelize } = require('../models');

jest.mock('../services/tmdbService');

describe('CinemaService', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should import movies from TMDB', async () => {
    const mockMovies = [{ title: 'Test Movie', overview: 'Description', id: 1 }];
    require('../services/tmdbService').fetchMovies.mockResolvedValue(mockMovies);

    await CinemaService.importMovies('popular');
    const movies = await Movie.findAll();
    expect(movies.length).toBe(1);
    expect(movies[0].title).toBe('Test Movie');
  });
});