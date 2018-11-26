import React, { Component } from 'react';
import decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import NProgress from 'nprogress';
import { Keyframes, animated, Trail } from 'react-spring';
import { FormContainer } from './styles/FormContainer';
import LoggedInContainer from './components/LoggedInContainer';
import { AppContainer } from './styles/AppContainer';
import { Header } from './styles/Header';
import './App.css';
import react from './images/react.png';
import node from './images/node.png';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';

class App extends Component {
  state = {
    user: {},
    reactLogo: true
  };
  componentWillMount() {
    this.getUser();
  }
  componentDidMount() {
    NProgress.configure({ parent: '#parent' });
  }

  getToken = async () => {
    //if storing jwt in local storage --not optimal
    //const token = await localStorage.getItem('id_token');

    //storing jwt in cookies
    const cookies = new Cookies();
    const token = await cookies.get('id_token_client');

    return token;
  };

  getUser = async () => {
    let token;
    try {
      token = await this.getToken();
      if (token) {
        const user = await decode(token);
        this.setState({ user });
      } else {
        this.setState({
          user: {}
        });
      }
    } catch (error) {
      return;
    }
  };

  render() {
    const { username, userId } = this.state.user;

    const Container = Keyframes.Spring(async next => {
      while (true) {
        await next({
          from: {
            x: -90,
            image: 'react.90552fc5'
          },
          to: {
            x: 270
          }
        });
      }
    });
    return (
      <AppContainer>
        <Header>
          <h1>User Authentication</h1>

          <Container reset onFrame={v => {}} config={{ duration: 2000 }}>
            {({ x, image }) => (
              <animated.div
                style={{
                  position: 'relative',

                  transform: `rotateY(${x}deg)`
                }}
              >
                {x < 90 ? (
                  <img height={150} src={node} alt={image} />
                ) : (
                  <img height={150} src={react} alt={image} />
                )}
              </animated.div>
            )}
          </Container>
        </Header>
        <div id="parent">{/* <div className="bar" role="bar" /> */}</div>
        <section>
          {username ? (
            <LoggedInContainer
              username={username}
              userId={userId}
              getUser={this.getUser}
              getToken={this.getToken}
              deleteUser={this.deleteUser}
            />
          ) : (
            <FormContainer>
              <Trail
                items={[
                  <SignUpForm key="SignUp" getUser={this.getUser} />,
                  <LogInForm key="LogIn" getUser={this.getUser} />
                ]}
                keys={item => item.key}
                from={{ transform: 'translate3d(-1000px,0px,0)' }}
                to={{ transform: 'translate3d(0,0px,0)' }}
              >
                {item => props => <span style={props}>{item}</span>}
              </Trail>
            </FormContainer>
          )}
        </section>
      </AppContainer>
    );
  }
}

export default App;
