import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Grid, Loader } from 'semantic-ui-react';
import classnames from 'classnames';
import { search as searchAction } from '../../actions/search.js';

import MediaCard from './MediaCard.js';
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
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.search(search);
    }, 1000);
  }

  timeout: () => ({})


  showResults = () => {
    const { searchSuccess, searchResults } = this.props;
    if (searchSuccess && searchResults.total_results > 0) {
      return searchResults.results.map(media => (<MediaCard media={media} />));
    }
    return '';
  }

  showEmpty = () => {
    if (this.props.searchSuccess && this.props.searchResults.total_results === 0) {
      return 'Aucun média concerné';
    }
    return '';
  }

  render() {
    const { search } = this.state;
    const { searchLoading, searchSuccess, searchResults } = this.props;
    return (
      <Grid
        className="full-height homepage"
        verticalAlign={searchLoading || searchSuccess ? 'top' : 'middle'}
        textAlign="center"
      >
        <Grid.Row>
          <Grid.Column computer={8} mobile={12} tablet={10}>
            <input
              className={classnames('search__input', { searching: searchLoading || searchSuccess })}
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
              {searchResults && searchResults.total_results > 0 && `  (${searchResults.total_results} résultats)`}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="results">
          {searchLoading && <Loader active />}
          {this.showResults()}
          {this.showEmpty()}
        </Grid.Row>
      </Grid>
    );
  }
}

Home.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  searchSuccess: PropTypes.bool.isRequired,
  searchResults: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchLoading: state.search.searchLoading,
  searchSuccess: state.search.searchSuccess,
  searchResults: state.search.result,
  searchFailed: state.search.searchFailed,
});

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(searchAction(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
