module.exports = class ParsedQuery {
  /** @type {string} */ command;
  /** @type {string[]} */ params;

  constructor({ command, params }) {
    this.command = command;
    this.params = params;
  }
};
