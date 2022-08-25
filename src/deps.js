const Geocoding = require('./models/Geocoding');
const Forecasts = require('./models/Forecasts');
const Users = require('./models/Users');

const DInjector = require('./core/DInjector');
const di = new DInjector();

const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DATABASE);

di.add('db', () => db);
di.add('geocoding', () => new Geocoding());
di.add('forecasts', () => new Forecasts());
di.add('users', () => di.inject(Users));

module.exports = di;
