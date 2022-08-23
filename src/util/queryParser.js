function parseQuery(query) {
  if (!query || typeof(query) !== 'string') {
    throw new TypeError();
  }

  let { command, ...params } = query.split(' ');
  if (command[0] !== '/') {
    throw new SyntaxError();
  }

  return {
    command: command.replace('/', ''),
    params
  }
}

module.exports = {
  parseQuery
};
