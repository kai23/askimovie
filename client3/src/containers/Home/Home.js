import React from 'react';
import { Grid } from 'semantic-ui-react';

import './Home.css';

class Home extends React.Component {
  state = {
    search: '',
  }

  onType = (e) => {
    const search = e.target.value;
    this.setState({
      search,
    });
  }

  render() {
    const { search } = this.state;
    return (
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
            onKeyUp={this.onType}
          />
          <span className="search__info">Appuyez sur Entrée pour rechercher</span>
          <span className="search__done">
            {search.length > 0 && 'Votre recherche pour '}
            <span className="searchTerms">{search}</span>
          </span>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
