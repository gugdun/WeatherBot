const { Sequelize } = require('sequelize');
const Coordinates = require("../entities/Coordinates");

module.exports = class Users {
  constructor(/** @type {Sequelize} */ db) {
    db.authenticate()
      .then((value) => console.log('Connection has been established successfully'))
      .catch((reason) => console.log('Unable to connect to the database'));
  }

  async create(userId) {

  }

  async remove(userId) {

  }

  async setLocation(userId, /** @type {Coordinates} */ location) {

  }

  /** @returns {Coordinates} */
  async getLocation(userId) {

  }
};
