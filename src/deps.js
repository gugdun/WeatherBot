const Geocoding = require('./models/Geocoding');
const Forecasts = require('./models/Forecasts');

const DInjector = require('./core/DInjector');
const di = new DInjector();

di.add('geocoding', () => new Geocoding());
di.add('forecasts', () => new Forecasts());

module.exports = di;
