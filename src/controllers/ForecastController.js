const di = require('../deps');
const format = require('../util/Format');

const Request = require('../entities/Request');
const Response = require('../entities/Response');
const Forecasts = require('../models/Forecasts');
const Geocoding = require('../models/Geocoding');

module.exports = di.inject(class ForecastController {
  /** @type {Forecasts} */ #forecasts;
  /** @type {Geocoding} */ #geocoding;

  constructor(forecasts, geocoding) {
    this.#forecasts = forecasts;
    this.#geocoding = geocoding;
  }

  async now(/** @type {Request} */ req, /** @type {Response} */ res) {
    try {
      const coords = await this.#geocoding.getCoordinates(req.params?.join(' '));
      const forecast = await this.#forecasts.currentWeather(coords);
      res.sendMessage(format.currentWeather(coords.name, forecast));
    } catch (e) {
      console.log(e);
      res.sendMessage(`Wrong city name!`);
    }
  }

  async tomorrow(/** @type {Request} */ req, /** @type {Response} */ res) {
    res.sendMessage(`Showing tomorrow weather`);
  }
});
