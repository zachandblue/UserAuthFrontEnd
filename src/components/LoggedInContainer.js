import React, { Component } from 'react';

import { Trail } from 'react-spring';

import { LoggedIn } from '../styles/LoggedIn';

import { LoggedInHeader } from '../styles/LoggedInHeader';
import '../App.css';

import User from './User';
import LogOut from './LogOut';
import DeleteUser from './DeleteUser';

export default class LoggedInContainer extends Component {
  render() {
    const { username, userId, getUser, deleteUser, getToken } = this.props;
    return (
      <LoggedIn>
        <Trail
          items={[
            <LoggedInHeader>
              {username && (
                <div style={{ display: 'flex' }}>
                  <h2>
                    You are now logged in as <span>{username}</span>
                  </h2>
                  <span>
                    <LogOut key="LogOut" getUser={getUser} />
                  </span>
                </div>
              )}
            </LoggedInHeader>,

            <User key="user" username={username} getUser={getUser} />,

            <DeleteUser
              key="delete"
              userId={userId}
              deleteUser={deleteUser}
              getToken={getToken}
              getUser={getUser}
            />
          ]}
          keys={item => item.key}
          from={{ transform: 'translate3d(-1000px,0px,0)' }}
          to={{ transform: 'translate3d(0,0px,0)' }}
        >
          {item => props => <span style={props}>{item}</span>}
        </Trail>
      </LoggedIn>
    );
  }
}
