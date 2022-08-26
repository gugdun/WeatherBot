const Users = require('../models/Users');
const Request = require('../entities/Request');
const Response = require('../entities/Response');

module.exports = async (/** @type {Request} */ req, /** @type {Response} */ res, next) => {
  if (await Users.findByPk(req.userId)) {
    next();
  } else {
    res.sendMessage('Type /start to get started.');
  }
}
