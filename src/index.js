const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;

if (process.env.ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

const locations = new Map();

bot.on('location', (query) => {
  const id = query.from.id;
  const lat = query.location.latitude;
  const long = query.location.longitude;
  locations.set(id, { lat, long });
});

bot.on('message', (query) => {
  const chatId = query.chat.id;
  const fromId = query.from.id;
  const { lat, long } =
    locations.has(fromId) ?
    locations.get(fromId) :
    { lat: null, long: null };

  if (query.text?.toLowerCase() !== '/forecast') {
    bot.sendMessage(chatId, 'Usage: /forecast [LOCATION] ...');
    return;
  }

  if (!(lat && long)) {
    bot.sendMessage(chatId, 'Your location is not available!');
    return;
  }

  axios
    .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&timezone=auto`)
    .then((res) => bot.sendMessage(chatId, forecast(res.data)))
    .catch((reason) => console.log(reason));
});

function direction(angle) {
  if (337.5 < angle && angle <= 22.5) {
    return '⬆';
  } else if (22.5 < angle && angle <= 67.5) {
    return '↖';
  } else if (67.5 < angle && angle <= 112.5) {
    return '⬅';
  } else if (112.5 < angle && angle <= 157.5) {
    return '↙';
  } else if (157.5 < angle && angle <= 202.5) {
    return '⬇';
  } else if (202.5 < angle && angle <= 247.5) {
    return '↘';
  } else if (247.5 < angle && angle <= 292.5) {
    return '➡';
  } else if (292.5 < angle && angle <= 337.5) {
    return '↗';
  }
}

function forecast(data) {
  const weather = data.current_weather;
  return `
🌡 ${weather.temperature}°
💨${direction(weather.winddirection)} ${weather.windspeed} km/h
  `;
}
