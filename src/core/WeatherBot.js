const TelegramBot = require('node-telegram-bot-api');
const MessageDispatcher = require('./MessageDispatcher');
const Request = require('../entities/Request');
const Response = require('../entities/Response');

const { parseQuery } = require('../util/Query');

const options = {
  polling: true
};

/**
 * @typedef {(req: Request, res: Response, next) => void} Middleware
 */

module.exports = class WeatherBot {
  /** @type {TelegramBot} */ #bot;
  /** @type {MessageDispatcher} */ #dispatcher;
  #middleware = [];

  constructor(dispatcher) {
    if (dispatcher) {
      this.#dispatcher = dispatcher;
    } else {
      this.#dispatcher = new MessageDispatcher();
    }
  }

  start(token) {
    this.#bot = new TelegramBot(token, options);
    this.#bot.on('message', this.#onMessage.bind(this));
  }

  use(/** @type {Middleware} */ middleware) {
    // Check input values
    if (!middleware || typeof(middleware) !== 'function') {
      throw new TypeError();
    }
    // Add middleware to stack
    this.#middleware.push(middleware);
  }

  add(command, callback) {
    this.#dispatcher.add(command, callback);
  }

  remove(command) {
    this.#dispatcher.remove(command);
  }

  async #onMessage(/** @type {TelegramBot.Message} */ message) {
    const chatId = message.chat.id;
    const userId = message.from.id;
    // TelegramBot.sendMessage wrapper
    const sendMessage = function(message) {
      this.#bot.sendMessage(chatId, message);
    }.bind(this);
    // Request and Response objects
    const request = { userId };
    const response = { sendMessage };
    // Call middleware
    let currentMiddleware = 0;
    const next = function() {
      currentMiddleware++;
      if (!this.#middleware[currentMiddleware]) return;
      this.#middleware[currentMiddleware](request, response, next);
    }.bind(this);
    if (this.#middleware.length > 0) {
      this.#middleware[0](request, response, next);
    }
    // Parse query and execute specified command
    parseQuery(message)
      .then(async parsed => {
        request.params = parsed.params;
        const { context, method } = this.#dispatcher.get(parsed.command);
        await context[method](request, response);
      })
      .catch(error => {
        console.log(error);
        sendMessage('No such command');
      });
  }
}
