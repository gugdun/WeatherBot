const { URL } = require('node:url');
const axios = require('axios').default;

const base = 'https://geocoding-api.open-meteo.com/v1/search';
const cityName = /^[A-Z \-]+$/i;

module.exports = class Geocoding {
  async getCoordinates(name) {
    // Check input value
    if (!name || typeof(name) !== 'string' || !cityName.test(name)) {
      throw new TypeError();
    }
    // Generate request URL
    const url = new URL(base);
    url.searchParams.append('name', name);
    // Execute API request
    const response = await axios.get(url.toString());
    return response.data?.results;
  }
};