module.exports = class Coordinates {
  /** @type {string} */ name;
  /** @type {number} */ latitude;
  /** @type {number} */ longitude;

  constructor({ name, latitude, longitude }) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
};
