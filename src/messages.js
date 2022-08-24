const ForecastController = require('./controllers/ForecastController');
const UserController = require('./controllers/UserController');

const MessageDispatcher = require('./core/MessageDispatcher');
const messages = new MessageDispatcher();

messages.add('start', UserController.create);
messages.add('stop', UserController.remove);
messages.add('now', ForecastController.now);
messages.add('tomorrow', ForecastController.tomorrow);

module.exports = messages;
