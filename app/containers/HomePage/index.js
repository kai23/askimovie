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
import isEmpty from 'lodash/isEmpty';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Grid, Form, Checkbox, Button, Icon, Message } from 'semantic-ui-react';
import messages from './messages';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    loginInput: false,
    passwordInput: false,
    capsLockOn: false,
    inputPasswordType: 'password',
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.loginInput !== this.state.loginInput ||
      nextState.passwordInput !== this.state.passwordInput ||
      nextState.capsLockOn !== this.state.capsLockOn ||
      nextState.inputPasswordType !== this.state.inputPasswordType
    ;
  }

  checkFilled = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    let capsLockOn = ev.getModifierState && ev.getModifierState('CapsLock');
    if (this.state.capsLockOn && capsLockOn && ev.keyCode === 20) capsLockOn = false;
    this.setState({ [field]: !isEmpty(value), capsLockOn });
  }

  showCapsMessage() {
    if (this.state.capsLockOn) {
      return (<Message attached="bottom" warning>
        <Message.Content>
          <Icon name="warning sign" /> Le verrouillage des majuscules est activé
            </Message.Content>
      </Message>
      );
    }
    return '';
  }

  toggleShowPassword = () => {
    const inputPasswordType = this.state.inputPasswordType === 'text' ? 'password' : 'text';
    this.setState({ inputPasswordType });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { loginInput, passwordInput, inputPasswordType } = this.state;
    return (
      <Grid style={{ height: '100%' }} textAlign="center" verticalAlign="middle">
        <Grid.Column computer={3} mobile={12} tablet={8} textAlign="left">
          {this.showCapsMessage()}
          <Form>
            <Form.Field>
              <input
                autoFocus
                type="email"
                name="loginInput"
                onKeyUp={this.checkFilled}
                placeholder={formatMessage(messages.login)}
              />
            </Form.Field>
            <Form.Field>
              <input
                type={inputPasswordType}
                name="passwordInput"
                onKeyUp={this.checkFilled}
                placeholder={formatMessage(messages.password)}
              />
              <Icon className="showPassword" name="eye" link onClick={this.toggleShowPassword} />
            </Form.Field>
            <Form.Field>
              <Checkbox label={formatMessage(messages.rememberme)} />
            </Form.Field>
            <Button disabled={!loginInput || !passwordInput} type="submit"><FormattedMessage {...messages.submit} /> </Button>
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
