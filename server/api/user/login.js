module.exports = (req, res, next) => {
  console.log('req.body', req.body);
  res.send({ status: 'OK' });
};
