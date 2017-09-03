import React from 'react';
import { Grid, Input } from 'semantic-ui-react';

import './Home.css';

const Home = () => (
  <Grid className="full-height homepage" textAlign="center" verticalAlign="middle">
    <Grid.Column computer={8} mobile={12} tablet={10} textAlign="left">
      <input
        className="search__input"
        name="search"
        type="search"
        placeholder="Rechercher..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus
      />
      <span className="search__info">Appuyez sur Entrée pour rechercher</span>
    </Grid.Column>
  </Grid>
);

export default Home;
