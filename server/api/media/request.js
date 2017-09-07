

module.exports = async (req, res, next) => {
  const mediaId = req.params.mediaId;
  const mediaType = req.body.media_type;
  const userId = req.session.user.id;

  const dto = {
    user_id: userId,
    media_id: mediaId,
    status: 'requested',
    media_type: mediaType,
    created_at: (new Date()).toJSON(),
    updated_at: (new Date()).toJSON(),
  };

  try {
    await knex('request').insert(dto);
    req.response = { status: 'requested' };
  } catch (err) {
    res.status(500);
    req.response = { status: 'errored' };
  } finally {
    next();
  }
};
