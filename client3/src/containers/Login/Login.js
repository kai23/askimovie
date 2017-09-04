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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Form, Checkbox, Button, Icon, Message } from 'semantic-ui-react';
import { login as loginAction } from '../../actions/login.js';


import './Login.css';

class Login extends React.PureComponent {
  state = {
    loginInput: false,
    passwordInput: false,
    capsLockOn: false,
    rememberMeInput: false,
    inputPasswordType: 'password',
    busy: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginSuccess && !this.props.loginSuccess) {
      nextProps.history.push('/');
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.loginInput !== this.state.loginInput ||
      nextState.passwordInput !== this.state.passwordInput ||
      nextState.capsLockOn !== this.state.capsLockOn ||
      nextState.inputPasswordType !== this.state.inputPasswordType ||
      nextProps !== this.props
    ;
  }


  onSubmit = () => {
    const login = this.state.loginInput;
    const password = this.state.passwordInput;
    this.props.login(login, password);
  }


  handleChange = (ev, data) => {
    const field = ev.target.name || data.name;
    const value = ev.target.value || data.checked;
    let capsLockOn = ev.getModifierState && ev.getModifierState('CapsLock');
    if (this.state.capsLockOn && capsLockOn && ev.keyCode === 20) capsLockOn = false;
    this.setState({ [field]: value, capsLockOn });
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

  showError = () => {
    if (this.props.loginFailed) {
      let message = 'Une erreur inconnue est survenue';

      if (this.props.loginError.status === 'AUTHENTICATION_FAILED') {
        message = "Le nom d'utilisateur ou le mot de passe est incorrect";
      }

      return (
        <Message attached="bottom" error>
          <Message.Content>
            <Icon name="exclamation circle" /> {message}
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
    const { loginInput, passwordInput, inputPasswordType } = this.state;
    return (
      <Grid style={{ height: '100%' }} textAlign="center" verticalAlign="middle">
        <Grid.Column computer={3} mobile={12} tablet={8} textAlign="left">
          {this.showCapsMessage()}
          {this.showError()}

          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <input
                autoFocus
                type="text"
                name="loginInput"
                onKeyUp={this.handleChange}
                placeholder="Nom d'utilisateur"
              />
            </Form.Field>
            <Form.Field>
              <input
                type={inputPasswordType}
                name="passwordInput"
                onKeyUp={this.handleChange}
                placeholder="Mot de passe"
              />
              <Icon className="showPassword" name="eye" link onClick={this.toggleShowPassword} />
            </Form.Field>
            <Form.Field>
              <Checkbox name="rememberMeInput" onChange={this.handleChange} label="Se souvenir de moi" />
            </Form.Field>
            <Button
              loading={this.props.loginLoading}
              disabled={!loginInput || !passwordInput}
            >
              Connexion
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}


Login.propTypes = {
  login: PropTypes.func.isRequired,

  loginSuccess: PropTypes.bool.isRequired,
  loginFailed: PropTypes.bool.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  loginLoading: state.login.loginLoading,
  loginSuccess: state.login.loginSuccess,
  loginFailed: state.login.loginFailed,
  loginError: state.login.loginError,
});

const mapDispatchToProps = dispatch => ({
  login: (user, password) => dispatch(loginAction(user, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
