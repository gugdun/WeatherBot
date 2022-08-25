const Geocoding = require('./models/Geocoding');
const Forecasts = require('./models/Forecasts');
const Users = require('./models/Users');

const DInjector = require('./core/DInjector');
const di = new DInjector();

di.add('geocoding', () => new Geocoding());
di.add('forecasts', () => new Forecasts());
di.add('users', () => new Users());

module.exports = di;
