function now(req, res) {
  res.sendMessage(`Showing current weather`);
}

function tomorrow(req, res) {
  res.sendMessage(`Showing tomorrow weather`);
}

module.exports = {
  now,
  tomorrow
};
