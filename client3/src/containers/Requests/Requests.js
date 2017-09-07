import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';

import { getRequests as getRequestsAction } from '../../actions/request';

class Request extends Component {
  componentDidMount() {
    this.props.getRequests();
  }


  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            Hello request
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Request.propTypes = {
  getRequests: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  getRequestLoading: state.request.getRequestLoading,
  getRequestSuccess: state.request.getRequestSuccess,
  requests: state.request.requests,
});

const mapDispatchToProps = dispatch => ({
  getRequests: () => dispatch(getRequestsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
