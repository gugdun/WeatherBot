const Geocoding = require('../models/Geocoding');
const geocoding = new Geocoding();

async function now(req, res) {
  try {
    let coords = await geocoding.getCoordinates(req.params?.join(' '));
    res.sendMessage(`Showing current weather in ${req.params?.join(' ')}`);
  } catch {
    res.sendMessage(`Wrong city name!`);
  }
}

async function tomorrow(req, res) {
  res.sendMessage(`Showing tomorrow weather`);
}

module.exports = {
  now,
  tomorrow
};
