module.exports = (req, res) => {
  if (req.response) {
    return res.json(req.response);
  }
  return res.json({});
};
