const TelegramBot = require('node-telegram-bot-api');
const MessageDispatcher = require('./MessageDispatcher');
const Request = require('../entities/Request');
const Response = require('../entities/Response');

const { parseQuery } = require('../util/Query');

const options = {
  polling: true
};

module.exports = class WeatherBot {
  /** @type {TelegramBot} */ #bot;
  /** @type {MessageDispatcher} */ #dispatcher;

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
    // Parse query and execute specified command
    parseQuery(message)
      .then(async parsed => {
        const { context, method } = this.#dispatcher.get(parsed.command);
        await context[method](
          new Request({ userId, params: parsed.params }),
          new Response({ sendMessage })
        );
      })
      .catch(error => {
        console.log(error);
        sendMessage('No such command');
      });
  }
}
