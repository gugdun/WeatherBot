const di = require('../deps');
const format = require('../util/Format');

module.exports = di.inject(class ForecastController {
  #forecasts = undefined;
  #geocoding = undefined;

  constructor(forecasts, geocoding) {
    this.#forecasts = forecasts;
    this.#geocoding = geocoding;
  }

  async now(req, res) {
    try {
      const coords = await this.#geocoding.getCoordinates(req.params?.join(' '));
      const forecast = await this.#forecasts.currentWeather(coords);
      res.sendMessage(format.currentWeather(forecast));
    } catch (e) {
      console.log(e);
      res.sendMessage(`Wrong city name!`);
    }
  }

  async tomorrow(req, res) {
    res.sendMessage(`Showing tomorrow weather`);
  }
});
