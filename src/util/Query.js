const TelegramBot = require('node-telegram-bot-api');
const ParsedQuery = require('../entities/ParsedQuery');

function parseLocation(/** @type {TelegramBot.Location} */ location) {
  // Check input values
  if (typeof(location?.latitude) !== 'number' ||
      typeof(location?.longitude) !== 'number')
  {
    throw new TypeError();
  }
  // Create ParsedQuery object
  let [ command, ...params ] = [ 'location', ...Object.values(location) ];
  return new ParsedQuery({ command, params });
}

function parseText(text) {
  // Check input values
  if (!text || typeof(text) !== 'string') {
    throw new TypeError();
  }
  // Split input string and check command syntax
  let [ command, ...params ] = text.split(/\s+/);
  if (command[0] !== '/') {
    throw new SyntaxError();
  }
  return new ParsedQuery({ command: command.replace('/', ''), params });
}

async function parseQuery(/** @type {TelegramBot.Message} */ query) {
  if (query.location) return parseLocation(query.location);
  else if (query.text) return parseText(query.text);
  throw new TypeError();
}

module.exports = {
  parseQuery
};
