const request = require('supertest');
const express = require('express');
const CinemaController = require('../controllers/cinemaController');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('CinemaController', () => {
  it('should import movies', async () => {
    const response = await request(app).get('/api/movies/import?category=popular');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Películas importadas exitosamente');
  });
});