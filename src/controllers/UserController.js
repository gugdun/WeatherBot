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
    if (created) res.sendMessage(`
Use /now Minsk to show the current weather in Minsk.
Use /tomorrow Minsk to show tomorrow's weather in Minsk.
You can send your geolocation to the bot and then the commands will work without specifying the city.
To stop working with the bot and delete all your data, use the /stop command.
    `);
  }

  async remove(/** @type {Request} */ req, /** @type {Response} */ res) {
    const removed = await this.#users.removeUser(req.userId);
    if (removed) res.sendMessage(`See you later! \u{1f44b}`);
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
    res.sendMessage(`Your location was changed!`);
  }
});
