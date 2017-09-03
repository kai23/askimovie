import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';


const NeedNotConnected = ({ component: Component, notAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (notAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)} // eslint-disable-line react/prop-types
  />
);

NeedNotConnected.propTypes = {
  component: PropTypes.func.isRequired,
  notAuthenticated: PropTypes.bool,
};

NeedNotConnected.defaultProps = {
  notAuthenticated: false,
};

const mapStateToProps = state => ({
  notAuthenticated: state.app.user && Object.keys(state.app.user).length === 0,
});


export default connect(mapStateToProps)(NeedNotConnected);
