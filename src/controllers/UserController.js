const di = require('../deps');

const Request = require('../entities/Request');
const Response = require('../entities/Response');
const Users = require('../models/Users');

module.exports = di.inject(class UserController {
  /** @type {Users} */ #users;

  constructor(users) {
    this.#users = users;
  }

  async create(/** @type {Request} */ req, /** @type {Response} */ res) {
    res.sendMessage(`User ${req.userId} was created!`);
  }

  async remove(/** @type {Request} */ req, /** @type {Response} */ res) {
    res.sendMessage(`User ${req.userId} was removed!`);
  }
});
