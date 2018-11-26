import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import decode from 'jwt-decode';
import NProgress from 'nprogress';

import { URL } from '../utilities/urls';

import { Button } from '../styles/Button';
import { ProtectedData } from '../styles/ProtectedData';
import { Transition } from 'react-spring';
import wait from 'waait';

export default class User extends Component {
  state = {
    username: '',
    message: '',
    toggle: false
  };

  componentDidMount() {
    this.props.getUser();
  }

  handleSubmit = async e => {
    e.preventDefault();
    NProgress.start();
    this.getUser();
    await wait();
    this.setState({ toggle: !this.state.toggle });
  };

  getUser = async () => {
    if (!(await this.getToken())) {
      this.setState({ message: 'Not Authorized' });
      return;
    }
    const token = await this.getToken();
    const decoded = decode(token);
    const csrfToken = decoded.csrfToken;
    fetch(`${URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        csrf: csrfToken

        // Authorization: `Bearer ${token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: 'include',
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(response => {
        NProgress.done();
        this.setState({
          username: '',
          password: '',

          message: response.message
        });
      })
      .catch(err => NProgress.done());
  };

  getToken = async () => {
    //const token = await localStorage.getItem('id_token');
    const cookies = new Cookies();
    const token = await cookies.get('id_token_client');
    return token;
  };

  getCSRF = async () => {
    const token = await this.getToken();
    const decoded = decode(token);
    const csrfToken = decoded.csrfToken;
    return csrfToken;
  };

  render() {
    const { message } = this.state;

    return (
      <ProtectedData>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit" height="70px" width="360px">
            Protected Data
          </Button>
        </form>
        <Transition
          items={this.state.toggle}
          from={{ position: 'relative', opacity: 0, transform: 'scale(1)' }}
          enter={{ opacity: 1, transform: 'scale(1.2)' }}
          leave={{ opacity: 0, transform: 'scale(1)' }}
        >
          {toggle =>
            toggle
              ? props => (
                  <div style={{ width: '80%', margin: 'auto' }}>
                    <h2 style={{ ...props, fontSize: '1em' }}>{message}</h2>
                  </div>
                )
              : null
          }
        </Transition>
      </ProtectedData>
    );
  }
}
