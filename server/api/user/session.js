module.exports = (req, res) => {
  res.json(req.session.user || {});
};
