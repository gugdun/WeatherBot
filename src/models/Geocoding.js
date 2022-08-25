const { URL } = require('node:url');
const axios = require('axios').default;

const Coordinates = require('../entities/Coordinates');

const base = 'https://geocoding-api.open-meteo.com/v1/search';
const rgCityName = /^[A-Z \-]+$/i;

module.exports = class Geocoding {
  async getCoordinates(name) {
    // Check input value
    if (!name || typeof(name) !== 'string' || !rgCityName.test(name)) {
      throw new TypeError();
    }
    // Generate request URL
    const url = new URL(base);
    url.searchParams.append('name', name);
    // Execute API request
    const response = await axios.get(url.toString());
    const results = response.data?.results;
    // Check results and return most relevant
    if (!results || !Array.isArray(results) || results.length === 0) {
      throw new ReferenceError();
    }
    return new Coordinates(results[0]);
  }
};
