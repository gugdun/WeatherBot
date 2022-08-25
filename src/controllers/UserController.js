const di = require('../deps');
const Users = require('../models/Users');

module.exports = di.inject(class UserController {
  /** @type {Users} */
  #users = undefined;

  constructor(/** @type {Users} */ users) {
    this.#users = users;
  }

  async create(req, res) {
    res.sendMessage(`User ${req.userId} was created!`);
  }

  async remove(req, res) {
    res.sendMessage(`User ${req.userId} was removed!`);
  }
});
