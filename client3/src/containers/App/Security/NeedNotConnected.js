import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';


const NeedNotConnected = ({ component: Component, hasSession, notAuthenticated, ...rest }) => {
  if (hasSession) {
    return (
      <Route
        {...rest}
        render={props => (notAuthenticated === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)} // eslint-disable-line react/prop-types
      />);
  }
  return (<Loader active />);
};

NeedNotConnected.propTypes = {
  component: PropTypes.func.isRequired,
  notAuthenticated: PropTypes.bool,
  hasSession: PropTypes.bool.isRequired,
};

NeedNotConnected.defaultProps = {
  notAuthenticated: false,
};

const mapStateToProps = state => ({
  notAuthenticated: state.app.user && Object.keys(state.app.user).length === 0,
  hasSession: state.app.getSessionSuccess,

});


export default connect(mapStateToProps)(NeedNotConnected);
