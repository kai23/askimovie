/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Grid, Form, Checkbox, Button } from 'semantic-ui-react';
import messages from './messages';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Grid style={{ height: '100%' }} textAlign="center" verticalAlign="middle">
        <Grid.Column widescreen computer={3} mobile={12} tablet={8} textAlign="left">
          <Form>
            <Form.Field>
              <input placeholder={formatMessage(messages.login)} />
            </Form.Field>
            <Form.Field>
              <input placeholder={formatMessage(messages.password)} />
            </Form.Field>
            <Form.Field>
              <Checkbox label={formatMessage(messages.rememberme)} />
            </Form.Field>
            <Button type="submit"><FormattedMessage {...messages.submit} /> </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

HomePage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HomePage);
