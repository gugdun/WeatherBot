module.exports = class DailyWeather {
  /** @type {Date} */ time;
  /** @type {number} */ weathercode;
  /** @type {number} */ temperature_max;
  /** @type {number} */ temperature_min;
  /** @type {number} */ windspeed_max;
  /** @type {number} */ winddirection_dominant;

  constructor({
    time,
    weathercode,
    temperature_max,
    temperature_min,
    windspeed_max,
    winddirection_dominant
  }) {
    this.time = new Date(time);
    this.weathercode = weathercode;
    this.temperature_max = temperature_max;
    this.temperature_min = temperature_min;
    this.windspeed_max = windspeed_max;
    this.winddirection_dominant = winddirection_dominant;
  }
};
