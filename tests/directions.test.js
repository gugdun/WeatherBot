const { describe, expect, test } = require('@jest/globals');
const { directions, direction } = require('../src/util/formatters');

describe('Cardinal points formatting', () => {

  test('North', () => {
    // Basic tests
    expect(direction(0)).toBe(directions.north);
    expect(direction(22.5)).toBe(directions.north);
    expect(direction(360-22)).toBe(directions.north);
    // Overflow tests
    expect(direction(360)).toBe(directions.north);
    expect(direction(-22)).toBe(directions.north);
    expect(direction(360+22.5)).toBe(directions.north);
  });

  test('North-West', () => {
    // Basic tests
    expect(direction(45)).toBe(directions.northWest);
    expect(direction(23)).toBe(directions.northWest);
    expect(direction(67.5)).toBe(directions.northWest);
    // Overflow tests
    expect(direction(360+45)).toBe(directions.northWest);
    expect(direction(360+23)).toBe(directions.northWest);
    expect(direction(360+67.5)).toBe(directions.northWest);
  });

  test('West', () => {
    // Basic tests
    expect(direction(90)).toBe(directions.west);
    expect(direction(68)).toBe(directions.west);
    expect(direction(112.5)).toBe(directions.west);
    // Overflow tests
    expect(direction(360+90)).toBe(directions.west);
    expect(direction(360+68)).toBe(directions.west);
    expect(direction(360+112.5)).toBe(directions.west);
  });

  test('South-West', () => {
    // Basic tests
    expect(direction(135)).toBe(directions.southWest);
    expect(direction(113)).toBe(directions.southWest);
    expect(direction(157.5)).toBe(directions.southWest);
    // Overflow tests
    expect(direction(360+135)).toBe(directions.southWest);
    expect(direction(360+113)).toBe(directions.southWest);
    expect(direction(360+157.5)).toBe(directions.southWest);
  });

  test('South', () => {
    // Basic tests
    expect(direction(180)).toBe(directions.south);
    expect(direction(158)).toBe(directions.south);
    expect(direction(202.5)).toBe(directions.south);
    // Overflow tests
    expect(direction(-180)).toBe(directions.south);
    expect(direction(360+158)).toBe(directions.south);
    expect(direction(360+202.5)).toBe(directions.south);
  });

  test('South-East', () => {
    // Basic tests
    expect(direction(225)).toBe(directions.southEast);
    expect(direction(203)).toBe(directions.southEast);
    expect(direction(247.5)).toBe(directions.southEast);
    // Overflow tests
    expect(direction(-135)).toBe(directions.southEast);
    expect(direction(360+203)).toBe(directions.southEast);
    expect(direction(360+247.5)).toBe(directions.southEast);
  });

  test('East', () => {
    // Basic tests
    expect(direction(270)).toBe(directions.east);
    expect(direction(248)).toBe(directions.east);
    expect(direction(292.5)).toBe(directions.east);
    // Overflow tests
    expect(direction(-90)).toBe(directions.east);
    expect(direction(360+248)).toBe(directions.east);
    expect(direction(360+292.5)).toBe(directions.east);
  });

  test('North-East', () => {
    // Basic tests
    expect(direction(315)).toBe(directions.northEast);
    expect(direction(293)).toBe(directions.northEast);
    expect(direction(337.5)).toBe(directions.northEast);
    // Overflow tests
    expect(direction(-45)).toBe(directions.northEast);
    expect(direction(360+293)).toBe(directions.northEast);
    expect(direction(360+337.5)).toBe(directions.northEast);
  });

});
