const TelegramBot = require('node-telegram-bot-api');
const MessageDispatcher = require('./MessageDispatcher');

const { parseQuery } = require('../util/Query');

const options = {
  polling: true
};

module.exports = class WeatherBot {
  #bot = undefined;
  #dispatcher = undefined;

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

  async #onMessage(message) {
    const chatId = message.chat.id;
    const userId = message.from.id;
    // TelegramBot.sendMessage wrapper
    const sendMessage = function(message) {
      this.#bot.sendMessage(chatId, message);
    }.bind(this);
    // Parse query and execute specified command
    parseQuery(message.text)
      .then(async parsed => {
        const { context, method } = this.#dispatcher.get(parsed.command);
        await context[method]({ userId, params: parsed.params }, { sendMessage });
      })
      .catch(error => {
        console.log(error);
        sendMessage('No such command');
      });
  }
}
