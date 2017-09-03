import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Loader } from 'semantic-ui-react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../Layouts/Back';

const Private = ({ component, hasSession, authenticated, ...rest }) => {
  if (hasSession) {
    return (
      <Route
        {...rest}
        render={
          props => (authenticated === true
            ? <Layout component={component} props={props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }
            }
            />)} // eslint-disable-line react/prop-types
      />
    );
  }
  return (<Loader active />);
};

Private.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  hasSession: PropTypes.bool.isRequired,
};

Private.defaultProps = {
  authenticated: false,
};

const mapStateToProps = state => ({
  authenticated: state.app.user && Object.keys(state.app.user).length > 0,
  hasSession: state.app.getSessionSuccess,
});


export default connect(mapStateToProps)(Private);
