/**
 * @typedef {Object} ControllerMethod
 * @property {any} context Method context
 * @property {string} method Method name
 */

module.exports = class MessageDispatcher {
  #mappings = new Map();

  add(command, context, method) {
    // Check input types
    if (typeof(command) !== 'string' ||
        typeof(context) !== 'object' ||
        typeof(method) !== 'string' ||
        !Reflect.has(context, method))
    {
      throw new TypeError();
    }
    // Check mapping existence
    if (this.#mappings.has(command)) {
      throw new ReferenceError();
    }
    // Create mapping
    this.#mappings.set(command, { context, method });
  }

  remove(command) {
    // Check mapping existence
    if (!this.#mappings.has(command)) {
      throw new ReferenceError();
    }
    // Remove mapping
    this.#mappings.delete(command);
  }

  /** @returns {ControllerMethod} */
  get(command) {
    // Check callback existence
    if (!this.#mappings.has(command)) {
      throw new ReferenceError();
    }
    // Return mapped callback
    return this.#mappings.get(command);
  }
};
