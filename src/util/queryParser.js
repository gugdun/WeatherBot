async function parseQuery(query) {
  // Check input type
  if (!query || typeof(query) !== 'string') {
    throw new TypeError();
  }
  // Split input string and check command syntax
  let [ command, ...params ] = query.split(' ');
  if (command[0] !== '/') {
    throw new SyntaxError();
  }
  // Return parsed query
  return {
    command: command.replace('/', ''),
    params
  }
}

module.exports = {
  parseQuery
};
