module.exports = class Request {
  /** @type {number} */ userId;
  /** @type {string[]} */ params;

  constructor({ userId, params }) {
    this.userId = userId;
    this.params = params;
  }
};
