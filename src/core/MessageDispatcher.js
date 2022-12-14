module.exports = class MessageDispatcher {
  #mappings = new Map();

  add(command, first, ...rest) {
    // Check input types
    if (typeof(command) !== 'string' ||
        typeof(first) !== 'function')
    {
      throw new TypeError();
    }
    // Check mapping existence
    if (this.#mappings.has(command)) {
      throw new ReferenceError();
    }
    // Create mapping
    this.#mappings.set(command, { first, rest });
  }

  remove(command) {
    // Check mapping existence
    if (!this.#mappings.has(command)) {
      throw new ReferenceError();
    }
    // Remove mapping
    this.#mappings.delete(command);
  }

  get(command) {
    // Check callback existence
    if (!this.#mappings.has(command)) {
      throw new ReferenceError();
    }
    // Return mapped callback
    return this.#mappings.get(command);
  }
};
