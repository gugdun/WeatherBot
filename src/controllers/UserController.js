const di = require('../deps');

const Users = require('../models/Users');
const Request = require('../entities/Request');
const Response = require('../entities/Response');
const Coordinates = require('../entities/Coordinates');

module.exports = di.inject(class UserController {
  /** @type {Users} */ #users;

  constructor(users) {
    this.#users = users;
  }

  async create(/** @type {Request} */ req, /** @type {Response} */ res) {
    const created = await this.#users.saveUser(req.userId);
    if (created) {
      res.sendMessage(`User ${req.userId} was created!`);
    } else {
      res.sendMessage(`User ${req.userId} already exists.`);
    }
  }

  async remove(/** @type {Request} */ req, /** @type {Response} */ res) {
    const removed = await this.#users.removeUser(req.userId);
    if (removed) {
      res.sendMessage(`User ${req.userId} was removed!`);
    } else {
      res.sendMessage(`User ${req.userId} does not exist.`);
    }
  }

  async setLocation(/** @type {Request} */ req, /** @type {Response} */ res) {
    await this.#users.setLocation(
      req.userId,
      new Coordinates({
        name: undefined,
        latitude: req.params[0],
        longitude: req.params[1]
      })
    );
    res.sendMessage(`User ${req.userId} location was changed!`);
  }
});
