import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { Grid, Rating, Image, Button, Popup } from 'semantic-ui-react';

const type = {
  tv: 'Série',
  movie: 'Film',
};

const MediaCard = ({ busy, media, requestMedia }) => (
  <Grid.Column className="media" computer={3} tablet={5} mobile={9} textAlign="left">
    <Image className="media-poster" centered fluid src={media.poster_full_path} spaced />
    <div className="media-content">
      <div className="media-badges">
        <span className={`media-type-${media.media_type}`}>
          {type[media.media_type]}
        </span>
        <span className="media-year">
          {media.release_date && media.release_date.split('-')[0]}
          {media.first_air_date && media.first_air_date.split('-')[0]}
        </span>
        {media.inPlex && (
          <span className={'media-inPlex'}>
            Plex
          </span>
        )}
        {media.isRequested && (
          <Popup
            trigger={<span className={'media-requested'}>Demandé</span>}
          > La demande a été faite par {media.requestedBy} le {format(media.requestedAt, 'DD/MM/YYYY')}
          </Popup>


        )}
      </div>
      <span className="media-title">
        {media.title || media.name || media.original_name}
      </span>
      <div>
        <p><i>{media.original_name || media.original_title}</i></p>
      </div>
      <div className="media-rating">
        <Rating icon="star" maxRating={10} disabled rating={media.vote_average} /> ({media.vote_count} votes)
      </div>
    </div>
    <div className="media-buttons">
      <Button.Group>
        <Button basic color="orange" inverted>Plus d&apos;infos</Button>
        <Button.Or text="ou" />
        {media.inPlex && (<Popup
          trigger={<Button className="media-ask-disabled">Demander</Button>}
        > C&apos;est déjà présent sur le plex, impossible de le demander
        </Popup>)}

        {media.isRequested && !media.inPlex && (<Popup
          trigger={<Button className="media-ask-disabled">Demander</Button>}
        > La demande a déjà été faite
        </Popup>)}

        {!media.inPlex && !media.isRequested && (<Button loading={busy} className="media-ask" onClick={() => requestMedia(media.id, media.media_type)} >Demander</Button>)}

      </Button.Group>

    </div>
  </Grid.Column>
);

MediaCard.propTypes = {
  media: PropTypes.shape({
    first_air_date: PropTypes.string,
    id: PropTypes.number,
    inPlex: PropTypes.bool,
    isRequested: PropTypes.bool,
    media_type: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    original_title: PropTypes.string,
    poster_full_path: PropTypes.string,
    release_date: PropTypes.string,
    requestedAt: PropTypes.string,
    requestedBy: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }).isRequired,
  requestMedia: PropTypes.func.isRequired,
};

export default MediaCard;
