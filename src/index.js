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

const connectionString = process.env.DATABASE;
if (!connectionString || typeof(connectionString) !== 'string') {
  console.log('No DATABASE environment variable!');
  process.exit(0);
}

// Connect to a database and test connection
(async function() {
  try {
    const database = require('./database').connect(connectionString);
    await database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (e) {
    console.log('Unable to connect to the database:', e);
    process.exit(0);
  }
}());

// Start bot
const WeatherBot = require('./core/WeatherBot');
const bot = new WeatherBot(require('./messages.js'));
bot.start(token);
