const WeatherBot = require('./core/WeatherBot');

// Read .env file in development environment
if (process.env.ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// Check required variables
const token = process.env.TOKEN;
if (!token || typeof(token) !== 'string') {
  console.log('No TOKEN environment variable!');
  process.exit(0);
}

// Start bot
const bot = new WeatherBot(require('./messages.js'));
bot.start(token);
//
