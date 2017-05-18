function loggedWithPlex() {
  return false;
}


module.exports = (req, res) => {
  const loggedWithPlexResponse = loggedWithPlex();
  if (loggedWithPlexResponse) {
    res.send({ status: 'OK' });
  } else {
    res.send({ status: 'KO' });
  }
};
