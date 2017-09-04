import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Rating, Image } from 'semantic-ui-react';

const type = {
  tv: 'Série',
  movie: 'Film',
};

const MediaCard = ({ media }) => (
  <Grid.Column className="media" computer={3} tablet={5} mobile={6} textAlign="left">
    <Image className="media-poster" centered fluid src={media.poster_full_path} spaced />
    <div className="media-content">
      <div className="media-badges">
        <span className={`media-type-${media.media_type}`}>
          {type[media.media_type]}
        </span>
        {media.inPlex && (
          <span className={'media-inPlex'}>
            Plex
          </span>
        )}
      </div>
      <span className="media-title">
        {media.title || media.name || media.original_name}
      </span>
      <div>
        <p><i>{media.original_name || media.original_title}</i></p>
        <Rating icon="star" maxRating={10} disabled rating={media.vote_average} mini /> ({media.vote_count} votes)
      </div>
    </div>
  </Grid.Column>
);

MediaCard.propTypes = {
  media: PropTypes.object.isRequired,
};

export default MediaCard;