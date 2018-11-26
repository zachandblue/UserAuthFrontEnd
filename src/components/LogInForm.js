import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import NProgress from 'nprogress';
import { URL } from '../utilities/urls';
import { Button } from '../styles/Button';

import { Form } from '../styles/Form';

export default class LogInForm extends Component {
  state = {
    username: '',
    password: '',
    message: '',
    touched: {
      username: false,
      password: false
    }
  };

  handleInput = async e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };

  handleSubmit = e => {
    e.preventDefault();
    NProgress.start();
    this.logIn();
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  logIn = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    fetch(`${URL}/users/login`, {
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
        this.setToken(response.token);
        this.setState({
          username: '',
          password: '',
          message: response.message
        });
        NProgress.done();
        this.props.getUser();
      })
      .catch(err => {
        NProgress.done();
        this.setState({ message: 'Something went wrong...' });
      });
  };

  setToken = token => {
    // localStorage.setItem('id_token', token);
    const cookies = new Cookies();
    try {
      cookies.set('id_token_client', token);
    } catch (error) {
      console.log(error);
    }
  };

  validate = (username, password) => {
    return {
      username: username.length === 0,
      password: password.length === 0
    };
  };

  render() {
    const { username, password, message } = this.state;
    const errors = this.validate(username, password);
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
            value={username}
            placeholder="username"
            onBlur={this.handleBlur('username')}
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

          <Button type="submit" disabled={!isEnabled}>
            Log In
          </Button>
          {message ? <p>{message}</p> : <div className="spacer" />}
        </Form>
      </div>
    );
  }
}
