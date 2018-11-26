import React, { Component } from 'react';
import decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { URL } from '../utilities/urls';
import { Button } from '../styles/Button';
import { Transition } from 'react-spring';

export default class DeleteUser extends Component {
  state = {
    confirmDelete: false,
    toggle: true
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (e.target.id !== 'delete') {
      this.setState({ toggle: true });
    }
  };

  deleteUser = async () => {
    const data = {
      userId: this.props.userId
    };

    const token = await this.props.getToken();
    const decoded = decode(token);
    const csrfToken = decoded.csrfToken;
    fetch(`${URL}/users/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        csrf: csrfToken

        // Authorization: `Bearer ${token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log(response.error);
          this.setState({
            message: response.error.message
          });
          return;
        }
        // localStorage.removeItem('id_token');
        const cookies = new Cookies();
        cookies.remove('id_token_client');
        this.props.getUser();
      })
      .catch(err => console.log(err));
  };

  render() {
    //const toggle = this.state;
    return (
      <div
        style={{
          width: '280px',
          margin: 'auto',
          textAlign: 'center',
          marginBottom: '50px'
        }}
      >
        <Transition
          items={this.state.toggle}
          initial={{ position: 'absolute', opacity: 1 }}
          from={{ position: 'absolute', opacity: 0, transform: 'scale(1)' }}
          enter={{ opacity: 1, transform: 'scale(1.2)' }}
          leave={{ opacity: 0, transform: 'scale(1)' }}
        >
          {toggle =>
            toggle
              ? props => (
                  <div
                    onClick={() =>
                      this.setState({ toggle: !this.state.toggle })
                    }
                    style={{ ...props, width: '280px' }}
                  >
                    <Button height="58px">Delete User</Button>
                  </div>
                )
              : props => (
                  <div
                    onClick={() => this.deleteUser()}
                    style={{
                      ...props,
                      width: '280px'
                    }}
                  >
                    <Button height="60px" id="delete" color="Crimson">
                      Are You Sure?
                    </Button>
                  </div>
                )
          }
        </Transition>
      </div>
    );
  }
}
