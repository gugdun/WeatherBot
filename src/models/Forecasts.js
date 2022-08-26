const { URL } = require('node:url');
const axios = require('axios').default;

const Coordinates = require('../entities/Coordinates');
const CurrentWeather = require('../entities/CurrentWeather');
const DailyWeather = require('../entities/DailyWeather');

const base = 'https://api.open-meteo.com/v1/forecast';

const dailyVariables = [
  'weathercode',
  'temperature_2m_max',
  'temperature_2m_min',
  'windspeed_10m_max',
  'winddirection_10m_dominant'
].join(',');

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

  async dailyWeather(/** @type {Coordinates} */ coords, /** @type {Date} */ date) {
    // Check input values
    if (!(coords && coords.latitude && coords.longitude)) {
      throw new TypeError();
    }
    if (!(date && date instanceof Date)) {
      throw new TypeError();
    }
    // Generate request URI
    const url = new URL(base);
    url.searchParams.append('latitude', coords.latitude);
    url.searchParams.append('longitude', coords.longitude);
    url.searchParams.append('timezone', 'auto');
    date = date.toISOString().split('T')[0];
    url.searchParams.append('start_date', date);
    url.searchParams.append('end_date', date);
    // Execute API request
    const response = await axios.get(url.toString() + `&daily=${dailyVariables}`);
    const daily = response.data?.daily;
    return new DailyWeather({
      time: daily?.time[0],
      weathercode: daily?.weathercode[0],
      temperature_max: daily?.temperature_2m_max[0],
      temperature_min: daily?.temperature_2m_min[0],
      windspeed_max: daily?.windspeed_10m_max[0],
      winddirection_dominant: daily?.winddirection_10m_dominant[0]
    });
  }
};
