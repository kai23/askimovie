import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Checkbox, Button, Icon, Message } from 'semantic-ui-react';
import LayoutLogin from '../components/LayoutLogin.js';
import request from '../utils/request.js';

const messageState = {
  UNEXPECTED_ERROR: {
    icon: 'remove circle',
    status: 'error',
    text: 'Une erreur inconnue est survenue. Merci de réessayer un peu plus tard :)',
  },
  AUTHENTICATION_FAILED: {
    icon: 'warning circle',
    status: 'warning',
    text: "Désolé, mais il semblerait que le nom d'utilisateur ou le mot de passe soit incorrect",
  },
  OK: {
    icon: 'check circle',
    status: 'success',
    text: 'Bravo, vous êtes bien connecté ! Redirection en cours...',
  },
  WAITING: {
    icon: 'info circle',
    status: 'info',
    text: 'Les identifiants et mot de passe à utiliser sont les mêmes que sur le Plex',
  },
};

class HomePage extends React.Component {
  state = {
    usernameInput: false,
    passwordInput: false,
    capsLockOn: false,
    rememberMeInput: false,
    inputPasswordType: 'password',
    status: 'WAITING',
    busy: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.usernameInput !== this.state.usernameInput ||
      nextState.passwordInput !== this.state.passwordInput ||
      nextState.capsLockOn !== this.state.capsLockOn ||
      nextState.inputPasswordType !== this.state.inputPasswordType ||
      nextState.status !== this.state.status ||
      nextState.busy !== this.state.busy
    ;
  }

  onSubmitForm = async () => {
    const { usernameInput, rememberMeInput, passwordInput } = this.state;
    const body = {
      username: usernameInput,
      remember: rememberMeInput,
      password: passwordInput,
    };
    this.setState({ busy: true });
    try {
      await request('/v1.0/user/login', { method: 'POST', body });
      this.setState({
        status: 'OK',
        busy: false,
      });
    } catch (err) {
      this.setState({
        status: err.responseJSON.status,
        busy: false,
      });
    }
  }

  handleChange = (ev, data) => {
    const field = ev.target.name || data.name;
    const value = ev.target.value || data.checked;
    let capsLockOn = ev.getModifierState && ev.getModifierState('CapsLock');
    if (this.state.capsLockOn && capsLockOn && ev.keyCode === 20) capsLockOn = false;
    this.setState({ [field]: value, capsLockOn, status: 'WAITING' });
  }

  showCapsMessage() {
    if (this.state.capsLockOn) {
      return (
        <Message attached="bottom" warning>
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

  showMessage() {
    if (this.state.capsLockOn) {
      return (
        <Message attached="bottom" warning>
          <Message.Content>
            <Icon name="warning sign" /> Le verrouillage des majuscules est activé
          </Message.Content>
        </Message>
      );
    }

    const message = messageState[this.state.status];
    const messageProps = { [message.status]: true };
    return (
      <Message attached="bottom" {...messageProps} >
        <Message.Content>
          <Icon name={message.icon} /> {message.text}
        </Message.Content>
      </Message>
    );
  }

  showError = () => {
    const errorMessage = {
      UNEXPECTED_ERROR: 'Une erreur inconnue est survenue. Merci de réessayer un peu plus tard :)',
      AUTHENTICATION_FAILED: "Désolé, mais il semblerait que le nom d'utilisateur ou le mot de passe soit incorrect",
    };
    if (errorMessage[this.state.status]) {
      return (
        <Message attached="bottom" error>
          <Message.Content>
            <Icon name="remove circle" /> {errorMessage[this.state.status]}
          </Message.Content>
        </Message>
      );
    }
    return '';
  }

  render() {
    const { usernameInput, passwordInput, inputPasswordType, status, busy } = this.state;
    console.log('this.props', this.props);
    return (
      <LayoutLogin>
        <Grid style={{ height: '100vh' }} textAlign="center" verticalAlign="middle">
          <Grid.Column computer={3} mobile={12} tablet={8} textAlign="left">
            {this.showMessage()}
            <Form onSubmit={this.onSubmitForm}>
              <Form.Field>
                <input
                  autoFocus
                  type="text"
                  name="usernameInput"
                  onKeyUp={this.handleChange}
                  placeholder="Nom d'utilisateur du Plex"
                />
              </Form.Field>
              <Form.Field>
                <input
                  type={inputPasswordType}
                  name="passwordInput"
                  onKeyUp={this.handleChange}
                  placeholder="Mot de passe du Plex"
                />
                <Icon className="showPassword" name="eye" link onClick={this.toggleShowPassword} />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  name="rememberMeInput"
                  onChange={this.handleChange}
                  label="Se souvenir de moi"
                />
              </Form.Field>
              <Button
                loading={status === 'OK' || busy}
                disabled={!usernameInput || !passwordInput || status === 'OK'}
              >
                Se connecter
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </LayoutLogin>
    );
  }
}

export default HomePage;
