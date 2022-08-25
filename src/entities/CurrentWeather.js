module.exports = class CurrentWeather {
  /** @type {number} */ temperature;
  /** @type {number} */ windspeed;
  /** @type {number} */ winddirection;
  /** @type {number} */ weathercode;

  constructor({ temperature, windspeed, winddirection, weathercode }) {
    this.temperature = temperature;
    this.windspeed = windspeed;
    this.winddirection = winddirection;
    this.weathercode = weathercode;
  }
};
