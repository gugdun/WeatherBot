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
    return directions.south;
  } else if (22.5 < angle && angle <= 67.5) {
    return directions.southWest;
  } else if (67.5 < angle && angle <= 112.5) {
    return directions.west;
  } else if (112.5 < angle && angle <= 157.5) {
    return directions.northWest;
  } else if (157.5 < angle && angle <= 202.5) {
    return directions.north;
  } else if (202.5 < angle && angle <= 247.5) {
    return directions.northEast;
  } else if (247.5 < angle && angle <= 292.5) {
    return directions.east;
  }
  return directions.southEast;
}

function weatherCode(code) {
  switch (code) {
    case 0:
      /* clear sky ☀ */
      return '\u{2600}';
    case 1:
      /* Mainly clear 🌤 */
      return '\u{1f324}';
    case 2:
      /* Partly cloudy ⛅ */
      return '\u{26c5}';
    case 3:
      /* Overcast ☁ */
      return '\u{2601}';
    case 45: case 48:
      /* Fog and depositing rime fog 🌫️ */
      return '\u{1f32b}';
    case 51: case 53: case 55:
      /* Drizzle: Light, moderate, and dense intensity 🌦 */
    case 56: case 57:
      /* Freezing Drizzle: Light and dense intensity 🌦 */
      return '\u{1f326}';
    case 61: case 63: case 65:
      /* Rain: Slight, moderate and heavy intensity 🌧 */
    case 66: case 67:
      /* Freezing Rain: Light and heavy intensity 🌧 */
    case 80: case 81: case 82:
      /* Rain showers: Slight, moderate, and violent 🌧 */
      return '\u{1f327}';
    case 71: case 73: case 75:
      /* Snow fall: Slight, moderate, and heavy intensity 🌨 */
    case 77:
      /* Snow grains 🌨 */
    case 85: case 86:
      /* Snow showers slight and heavy 🌨 */
      return '\u{1f328}';
    case 95:
      /* Thunderstorm: Slight or moderate 🌩 */
      return '\u{1f329}';
    case 96: case 99:
      /* Thunderstorm with slight and heavy hail ⛈ */
      return '\u{26c8}';
    default:
      /* Unknown ❓ */
      return '\u{2753}';
  }
}

function currentWeather(city, data) {
  // Check input data
  if (!Number.isFinite(data.temperature)) data.temperature = 'Unknown';
  if (!Number.isFinite(data.windspeed)) data.windspeed = 'Unknown';
  else data.windspeed += ' km/h';
  // Return formatted string
  return `
Weather in ${city} now ${weatherCode(data.weathercode)}
🌡 ${data.temperature}° C
💨${direction(data.winddirection)} ${data.windspeed}
  `;
}

module.exports = {
  directions,
  direction,
  weatherCode,
  currentWeather
};
