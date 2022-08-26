const { Model, DataTypes } = require('sequelize');
const database = require('../database').database;

const Coordinates = require("../entities/Coordinates");

class Users extends Model {
  static async saveUser(id) {
    const [, created] = await Users.findOrCreate({
      where: { id }
    });
    return created;
  }

  static async removeUser(id) {
    return (await Users.destroy({
      where: { id }
    })) > 0;
  }

  static async setLocation(id, /** @type {Coordinates} */ location) {
    await Users.update({
      latitude: location.latitude,
      longitude: location.longitude
    }, {
      where: { id }
    });
  }

  /** @returns {Promise<Coordinates>} */
  static async getLocation(id) {
    const user = await Users.findByPk(id);
    return new Coordinates({
      name: 'your location',
      latitude: user.latitude,
      longitude: user.longitude
    });
  }
};

// Initialize model
Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true
  }
}, { sequelize: database });

// Syncronize model with database
(async function() {
  await Users.sync();
}());

module.exports = Users;
