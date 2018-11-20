import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';

class Signup extends Component {
    state={
        email:'',
        username:'',
        password:'',
        passwordReenter:''
    }

    componentWillUnmount(){
        this.setState({
            email:'',
            username:'',
            password:'',
            passwordReenter:'',
            error:true
        })
    }

    handleSumbit=(event)=>{
        event.preventDefault();
        console.log(this.state);

    }

    handleInput = (event, { value, name })=>{
        // console.log(event.target, value, name)
        let temp={};
        temp[name] = value;
        this.setState({...temp})
    }

    displayMessage=()=>{
        let message1 = <Message color="red">
            Password does not match!
            </Message>        
        return this.state.passwordReenter !== "" && this.state.password!==this.state.passwordReenter ? message1: null;                 
    }

    checkPassword=()=>{
        let message1 = <Message color="red">
            Password can not be blank!
            </Message>        
        return this.state.password === "" ? message1: null;                 
    
    }

    checkEmailMessage=()=>{
        let message = <Message color="red">
        Email address can not be blank!
        </Message>
    return this.state.email === ""? message: null;     
    }

    
    render() {
        const {email , username, password, passwordReenter} = this.state;
        return (
            <div className='signup-form'>

            <Grid textAlign='center' style={{ height: '100%'}} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                   Please Sign Up
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' 
                        name="email"
                        iconPosition='left' 
                        placeholder='E-mail address'
                        onChange={this.handleInput} 
                        value={email}/>
                    <Form.Input fluid icon='user' 
                        name="username"
                        iconPosition='left' 
                        placeholder='Name' 
                        onChange={this.handleInput} 
                        value={username}/>
                    <Form.Input
                      fluid
                      name="password"
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      onChange={this.handleInput} 
                      type='password'
                      value={password}
                    />

                    <Form.Input
                      fluid
                      name="passwordReenter"
                      icon='lock'
                      iconPosition='left'
                      placeholder='Reenter Your Password'
                      onChange={this.handleInput} 
                      type='password'
                      value={passwordReenter}
                    />
        
                    <Button color='green' fluid size='large' onClick={this.handleSumbit}>
                      Sign Up
                    </Button>
                  </Segment>
                </Form>
                {this.displayMessage()}
                {this.checkEmailMessage()}
                {this.checkPassword()}
    

              </Grid.Column>
            </Grid>
          </div>
        );
    }
}

export default Signup;