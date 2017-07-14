module.exports = (req, res) => {
  console.log('Je récupère la session');
  console.log('req.session', req.session);
  res.json(req.session.user || {});
};
