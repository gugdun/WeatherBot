/**
 * @typedef {(message: String) => void} SendMessage
 */

module.exports = class Response {
  /** @type {SendMessage} */ sendMessage;

  constructor({ sendMessage }) {
    this.sendMessage = sendMessage;
  }
};
