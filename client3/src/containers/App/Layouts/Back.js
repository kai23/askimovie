import React from 'react';
import PropTypes from 'prop-types';

import { Segment, Icon } from 'semantic-ui-react';


const Layout = ({ component: Component, props, logout }) => (
  <div className="full-height container">
    <div className="top-menu">
      <span className="top-menu-company"> Askimovie </span>
      <div className="top-menu-right">
        <div className="top-menu-item">
          <Icon name="sign out" /> Déconnexion
        </div>
      </div>
    </div>
    <div className="full-height content">
      <Segment basic className="full-height">
        <Component {...props} />
      </Segment>
    </div>
  </div>
);

Layout.propTypes = {
  component: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
};

export default Layout;
