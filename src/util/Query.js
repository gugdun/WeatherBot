async function parseQuery(query) {
  // Check input values
  if (!query || typeof(query) !== 'string') {
    throw new TypeError();
  }
  // Split input string and check command syntax
  let [ command, ...params ] = query.split(/\s+/);
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
