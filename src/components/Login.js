import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { postSessions } from '../Adapter';

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: null
  }

  componentWillUnmount() {
    this.setState({
      email: '',
      password: '',
      message: null
    })
  }


  handleSumbit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    let user = {
      email,
      password
    }
    postSessions(user).then(this.handleErrors).then(d => {
      if (d.token) {
        localStorage.setItem('token', d.token)
        this.props.backToHome()
      } else {
        alert(Object.keys(d) + " " + d[Object.keys(d)]);
      }
    }).catch((error) => {
      this.setState({ message: "Email/Password incorrect!" })
    })
  }


  handleGuestLogin = (event) => {
    event.preventDefault();
    this.setState({ email: "guest@guest.com", password: "guest@guest.com" }, () => this.handleSumbit(event))
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  handleInput = (event, { value, name }) => {
    let message = null;
    this.setState({ [name]: value, message })
  }

  displayMessage = () => {
    let message1 = <Message color="red">
      {this.state.message}
    </Message>
    return this.state.message ? message1 : null;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='login-form'>

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
              Please Login
                </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user'
                  value={email}
                  onChange={this.handleInput}
                  iconPosition='left'
                  placeholder='E-mail address'
                  name="email" />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleInput}
                  name="password"
                  value={password}

                />

                <Button color='green' fluid size='large' onClick={this.handleSumbit}>
                  Login
                    </Button>
                <br></br>
                <Button color='blue' fluid size='large' onClick={this.handleGuestLogin}>
                  Guest Demo Login
                    </Button>
              </Segment>
            </Form>
            {this.displayMessage()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;