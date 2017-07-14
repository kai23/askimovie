module.exports = (req, res) => {
  console.log('req.response', req.response);
  if (req.response) {
    return res.json(req.response);
  }
  return res.json({});
};
