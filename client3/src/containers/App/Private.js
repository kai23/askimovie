import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';


const Private = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (authenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} // eslint-disable-line react/prop-types
  />
);

Private.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

Private.defaultProps = {
  authenticated: false,
};

const mapStateToProps = state => ({
  authenticated: state.app.user && Object.keys(state.app.user).length > 0,
});


export default connect(mapStateToProps)(Private);
