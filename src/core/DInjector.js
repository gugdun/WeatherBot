const rgParams = /(?!constructor)(?:\((?:\s?[\$\w]+\s?,?)*\))/;

module.exports = class DInjector {
  #deps = new Map();

  add(name, dep) {
    // Check input
    if (!name || typeof(name) !== 'string' || typeof(dep) !== 'function') {
      throw new TypeError();
    }
    // Check dependency existence
    if (this.#deps.has(name)) {
      throw new ReferenceError();
    }
    // Add dependency
    this.#deps.set(name, dep);
  }

  remove(name) {
    // Check input
    if (!name || typeof(name) !== 'string') {
      throw new TypeError();
    }
    // Check dependency existence
    if (!this.#deps.has(name)) {
      throw new ReferenceError();
    }
    // Remove dependency
    this.#deps.delete(name);
  }

  inject(target) {
    // Check input
    if (typeof(target) !== 'function') {
      throw new TypeError();
    }
    // Get constructor parameters
    let params = target.prototype.constructor.toString().match(rgParams);
    if (!params) {
      throw new TypeError();
    }
    params = params[0].replaceAll(/[\(\)]/g, '').split(/[\s,]+/);
    // Create instance with required dependencies
    try {
      return new target(...params.map(dep => this.#deps.get(dep)()));
    } catch (e) {
      console.log(e);
      throw new ReferenceError();
    }
  }
};
