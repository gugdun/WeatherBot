const { Sequelize } = require('sequelize');

let database;

module.exports = {
  /** @returns {Sequelize} */
  connect(connectionString) {
    if (!database) {
      database = new Sequelize(connectionString);
    }
    return database;
  },
  /** @returns {Sequelize | undefined} */
  get database() {
    return database;
  }
};
