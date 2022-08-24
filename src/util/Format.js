const directions = {
  north: '\u{2b06}',
  northEast: '\u{2197}',
  east: '\u{27a1}',
  southEast: '\u{2198}',
  south: '\u{2B07}',
  southWest: '\u{2199}',
  west: '\u{2B05}',
  northWest: '\u{2196}'
};

function direction(angle) {
  // Check argument type
  if (!Number.isFinite(angle)) {
    return '';
  }
  // Convert input value to degrees of a circle
  if (angle >= 360) angle -= 360;
  else if (angle < 0) angle += 360;
  // Convert degrees to emoji
  if (337.5 < angle || angle <= 22.5) {
    return directions.north;
  } else if (22.5 < angle && angle <= 67.5) {
    return directions.northWest;
  } else if (67.5 < angle && angle <= 112.5) {
    return directions.west;
  } else if (112.5 < angle && angle <= 157.5) {
    return directions.southWest;
  } else if (157.5 < angle && angle <= 202.5) {
    return directions.south;
  } else if (202.5 < angle && angle <= 247.5) {
    return directions.southEast;
  } else if (247.5 < angle && angle <= 292.5) {
    return directions.east;
  }
  return directions.northEast;
}

function currentWeather(data) {
  // Check input data
  if (!Number.isFinite(data.temperature)) data.temperature = 'Unknown';
  if (!Number.isFinite(data.windspeed)) data.windspeed = 'Unknown';
  else data.windspeed += ' km/h';
  // Return formatted string
  return `
🌡 ${data.temperature}°
💨${direction(data.winddirection)} ${data.windspeed}
  `;
}

module.exports = {
  directions,
  direction,
  currentWeather
};
