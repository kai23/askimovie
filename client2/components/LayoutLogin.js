import React from 'react';

import request from '../utils/request.js';

export default class LayoutLogin extends React.Component {
  static async getInitialProps({ req }) {
    let cookies = null;
    if (req && req.headers.cookie) {
      cookies = req.headers.cookie;
    }
    const session = await request('/v1.0/user/session', { cookies });
    console.log('session', session);
    return { session };
  }

  render() {
    console.log('this.props.session', this.props.session);
    return (
      <div>{React.cloneElement(this.props.children, { session: this.props.session })}</div>
    );
  }
}
