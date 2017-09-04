import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';
import classnames from 'classnames';
import { search as searchAction } from '../../actions/search.js';

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


  render() {
    const { search } = this.state;
    const { searchLoading, searchSuccess } = this.props;

    return (
      <Grid className="full-height homepage" textAlign="center" verticalAlign="middle">
        <Grid.Column computer={8} mobile={12} tablet={10} textAlign="left">
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
          </span>
        </Grid.Column>
      </Grid>
    );
  }
}

Home.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  searchSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  searchLoading: state.search.searchLoading,
  searchSuccess: state.search.searchSuccess,
  searchResults: state.search.results,
  searchFailed: state.search.searchFailed,
});

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(searchAction(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
