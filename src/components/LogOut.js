import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { URL } from '../utilities/urls';

import { Button } from '../styles/Button';
import wait from 'waait';
export default class User extends Component {
  state = {
    username: '',
    message: ''
  };

  isCancelled = false;

  handleSubmit = e => {
    e.preventDefault();
    this.logOut();
  };

  logOut = async () => {
    //jwt in local storage
    //localStorage.removeItem('id_token');

    //jwt in cookies
    this.logOutPostReq();
    await wait();
    const cookies = new Cookies();
    await cookies.remove('id_token_client');

    await wait();
    this.props.getUser();
  };

  getUser = async () => {
    //const token = await this.getToken();
    fetch(`${URL}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // Authorization: `Bearer ${token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          username: '',
          password: '',

          message: response.message
        });
      })
      .catch(err => console.log(err));
  };

  getToken = async () => {
    //const token = await localStorage.getItem('id_token');
    const cookies = new Cookies();
    const token = await cookies.get('id_token');
    return token;
  };

  logOutPostReq = () => {
    fetch(`${URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'

        // Authorization: `Bearer ${token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: 'include'
    })
      .then(response => response.json())

      .catch(err => console.log(err));
  };

  componentWillUnmount() {
    this.isCancelled = false;
  }

  render() {
    const { message } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Log Out</Button>
        </form>

        <h2>{message}</h2>
      </div>
    );
  }
}
