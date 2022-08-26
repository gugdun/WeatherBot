const di = require('../deps');
const format = require('../util/Format');

const Request = require('../entities/Request');
const Response = require('../entities/Response');
const Forecasts = require('../models/Forecasts');
const Geocoding = require('../models/Geocoding');
const Users = require('../models/Users');

module.exports = di.inject(class ForecastController {
  /** @type {Forecasts} */ #forecasts;
  /** @type {Geocoding} */ #geocoding;
  /** @type {Users} */ #users;

  constructor(forecasts, geocoding, users) {
    this.#forecasts = forecasts;
    this.#geocoding = geocoding;
    this.#users = users;
  }

  async now(/** @type {Request} */ req, /** @type {Response} */ res) {
    try {
      let coords;
      if (req.params.length === 0) {
        coords = await this.#users.getLocation(req.userId);
      } else {
        coords = await this.#geocoding.getCoordinates(req.params.join(' '));
      }
      const forecast = await this.#forecasts.currentWeather(coords);
      res.sendMessage(format.currentWeather(coords.name, forecast));
    } catch (e) {
      console.log(e);
      res.sendMessage(`Please send your geolocation or specify the city name!`);
    }
  }

  async tomorrow(/** @type {Request} */ req, /** @type {Response} */ res) {
    try {
      let coords;
      if (req.params.length === 0) {
        coords = await this.#users.getLocation(req.userId);
      } else {
        coords = await this.#geocoding.getCoordinates(req.params.join(' '));
      }
      const tomorrow = new Date(Date.now());
      tomorrow.setDate(tomorrow.getDate() + 1);
      const forecast = await this.#forecasts.dailyWeather(coords, tomorrow);
      res.sendMessage(format.dailyWeather(coords.name, forecast));
    } catch (e) {
      console.log(e);
      res.sendMessage(`Please send your geolocation or specify the city name!`);
    }
  }
});
