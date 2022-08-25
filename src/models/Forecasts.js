const { URL } = require('node:url');
const axios = require('axios').default;

const CurrentWeather = require('../entities/CurrentWeather');
const Coordinates = require('../entities/Coordinates');

const base = 'https://api.open-meteo.com/v1/forecast';

module.exports = class Forecasts {
  async currentWeather(/** @type {Coordinates} */ coords) {
    // Check input values
    if (!coords || !coords.latitude || !coords.longitude) {
      throw new TypeError();
    }
    // Generate request URI
    const url = new URL(base);
    url.searchParams.append('latitude', coords.latitude);
    url.searchParams.append('longitude', coords.longitude);
    url.searchParams.append('current_weather', true);
    // Execute API request
    const response = await axios.get(url.toString());
    return new CurrentWeather(response.data?.current_weather);
  }
};
