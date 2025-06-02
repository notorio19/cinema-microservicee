const fetch = require('node-fetch');

class TMDBService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.themoviedb.org/3';
  }

  async getPopularMovies() {
    const response = await fetch(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
    const data = await response.json();
    return data.results;
  }
}

module.exports = TMDBService;