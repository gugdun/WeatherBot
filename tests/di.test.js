const { describe, expect, test } = require('@jest/globals');
const DInjector = require('../src/core/DInjector');

const di = new DInjector();
di.add('dep1', () => { return { param: 42 } });
di.add('dep2', () => { return { param: 'test' } });

class TestClass1 {
  constructor(dep1) { this.dep = dep1; }
  test() { return this.dep.param; }
}

class TestClass2 {
  constructor(dep2) { this.dep = dep2; }
  test() { return this.dep.param; }
}

class TestClass3 {
  constructor(dep3) {}
}

class BlankClass {}

class WithComments {
  constructor(/** @type {object} */ dep1) { this.dep = dep1; }
  test() { return this.dep.param; }
}

describe('Dependency injection test', () => {
  test('Dependency 1', () => {
    const obj = di.inject(TestClass1);
    expect(obj.test()).toBe(42);
  });

  test('Dependency 2', () => {
    const obj = di.inject(TestClass2);
    expect(obj.test()).toBe('test');
  });

  test('Non existing dependency', () => {
    expect(() => di.inject(TestClass3)).toThrow();
  });

  test('Class without constructor', () => {
    expect(() => di.inject(BlankClass)).toThrow();
  });

  test('Add existing dependency', () => {
    expect(() => di.add('dep1', () => {})).toThrow();
  });

  test('Remove non existing dependency', () => {
    expect(() => di.remove('dep3')).toThrow();
  });

  test('Comment in parameter list', () => {
    const obj = di.inject(WithComments);
    expect(obj.test()).toBe(42);
  });
});
