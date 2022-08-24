function create(req, res) {
  res.sendMessage(`User ${req.userId} was created!`);
}

function remove(req, res) {
  res.sendMessage(`User ${req.userId} was removed!`);
}

module.exports = {
  create,
  remove
};
