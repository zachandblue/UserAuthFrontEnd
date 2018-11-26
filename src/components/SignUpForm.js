import React, { Component } from 'react';
import wait from 'waait';
import NProgress from 'nprogress';
import Cookies from 'universal-cookie';
import { URL } from '../utilities/urls';
import { Button } from '../styles/Button';
import { Form } from '../styles/Form';

export default class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    message: '',
    touched: {
      username: false,
      password: false,
      passwordConfirm: false
    }
  };

  handleInput = async e => {
    const formData = {};
    formData[e.target.name] = e.target.value;

    this.setState({ ...formData });
    await wait();
    if (
      this.state.touched.password &&
      this.state.password !== this.state.passwordConfirm
    ) {
      this.setState({ message: 'Passwords do not match' });
    } else {
      this.setState({ message: '' });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    NProgress.start();
    this.signUp();
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };
  setToken = token => {
    //localStorage.setItem('id_token', token);
    const cookies = new Cookies();
    try {
      cookies.set('id_token_client', token);
    } catch (error) {
      console.log(error);
    }
  };

  signUp = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };

    fetch(`${URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          this.setState({
            message: response.error.message
          });
          return;
        }
        this.setState({
          username: '',
          password: '',
          passwordConfirm: '',
          message: response.message
        });
        this.setToken(response.createdUser.token);
        NProgress.done();
        this.props.getUser();
      })
      .catch(err => NProgress.done());
  };

  validate = (username, password, passwordConfirm) => {
    return {
      username: username.length === 0,
      password: password.length === 0,
      passwordConfirm: passwordConfirm.length === 0,
      passwordMatch: password !== passwordConfirm
    };
  };

  render() {
    const { username, password, passwordConfirm } = this.state;
    //const isEnabled = username.length > 0 && password.length > 0;
    const errors = this.validate(username, password, passwordConfirm);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <input
            name="username"
            type="text"
            onChange={this.handleInput}
            onBlur={this.handleBlur('username')}
            value={username}
            placeholder="username"
            className={shouldMarkError('username') ? 'error' : ''}
          />
          <input
            name="password"
            type="password"
            onChange={this.handleInput}
            value={password}
            placeholder="password"
            onBlur={this.handleBlur('password')}
            className={shouldMarkError('password') ? 'error' : ''}
          />
          <input
            name="passwordConfirm"
            type="password"
            onChange={this.handleInput}
            value={passwordConfirm}
            placeholder="confirm password"
            onBlur={this.handleBlur('passwordConfirm')}
            className={shouldMarkError('passwordConfirm') ? 'error' : ''}
          />
          <Button type="submit" disabled={!isEnabled}>
            Sign Up
          </Button>
          {this.state.message ? (
            <p>{this.state.message}</p>
          ) : (
            <div className="spacer" />
          )}
        </Form>
      </div>
    );
  }
}
