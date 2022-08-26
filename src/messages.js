const ForecastController = require('./controllers/ForecastController');
const UserController = require('./controllers/UserController');
const UserMiddleware = require('./middleware/UserMiddleware');

const MessageDispatcher = require('./core/MessageDispatcher');
const messages = new MessageDispatcher();

messages.add('start', UserController.create.bind(UserController));
messages.add('stop', UserMiddleware, UserController.remove.bind(UserController));
messages.add('location', UserMiddleware, UserController.setLocation.bind(UserController));
messages.add('now', UserMiddleware, ForecastController.now.bind(ForecastController));
messages.add('tomorrow', UserMiddleware, ForecastController.tomorrow.bind(ForecastController));

module.exports = messages;
