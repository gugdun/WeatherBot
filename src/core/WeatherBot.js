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

  /** @type {Request} */ #request;
  /** @type {Response} */ #response;
  /** @type {TelegramBot.Message} */ #message;
  /** @type {number} */ #currentMiddleware;
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

  #callMiddleware() {
    this.#middleware[this.#currentMiddleware](
      this.#request,
      this.#response,
      this.#next.bind(this)
    );
  }

  #callMethod() {
    parseQuery(this.#message)
      .then(parsed => {
        this.#request.params = parsed.params;
        const { first, rest } = this.#dispatcher.get(parsed.command);
        // Traverse the local middleware stack
        let current = -1;
        const next = function() {
          current++;
          if (!rest[current]) return;
          rest[current](this.#request, this.#response, next);
        }.bind(this);
        first(this.#request, this.#response, next);
      })
      .catch(error => {
        console.log(error);
        this.#response.sendMessage('No such command.');
      });
  }

  #next() {
    this.#currentMiddleware++;
    if (this.#middleware[this.#currentMiddleware]) {
      this.#callMiddleware();
    } else {
      this.#callMethod();
    }
  }

  #onMessage(/** @type {TelegramBot.Message} */ message) {
    const chatId = message.chat.id;
    const userId = message.from.id;
    // TelegramBot.sendMessage wrapper
    const sendMessage = function(message) {
      this.#bot.sendMessage(chatId, message);
    }.bind(this);
    // Create Request and Response objects
    this.#request = new Request({ userId });
    this.#response = new Response({ sendMessage });
    // Traverse the global middleware stack
    this.#message = message;
    this.#currentMiddleware = -1;
    this.#next();
  }
}
