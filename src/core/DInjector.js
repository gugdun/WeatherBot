const rgParams = /(?:constructor)(\((?:\s*[\$\w]+\s*,?)*\))/;
const rgComments = /\/\*\*(.|\n|\r)+?\*\//g;

/**
 * @typedef {() => object} FactoryMethod
 */

module.exports = class DInjector {
  #deps = new Map();

  add(name, /** @type {FactoryMethod} */ dep) {
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
    let params = target.prototype.constructor.toString();
    params = params.replaceAll(rgComments, '');
    params = params.match(rgParams);
    if (!params) {
      throw new TypeError();
    }
    params = params[1].replaceAll(/[\(\s\)]/g, '').split(',');
    // Create instance with required dependencies
    try {
      return new target(...params.map(dep => this.#deps.get(dep)()));
    } catch (e) {
      console.log(e);
      throw new ReferenceError();
    }
  }
};
