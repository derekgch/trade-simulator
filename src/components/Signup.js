import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { postUser } from '../Adapter';

class Signup extends Component {
    state={
        email:'',
        username:'',
        password:'',
        passwordReenter:'',
        message:null
    }

    componentWillUnmount(){
        this.setState({
            email:'',
            username:'',
            password:'',
            passwordReenter:'',
            message:""
        })
    }

    handleSumbit=(event)=>{
        event.preventDefault();
        console.log(this.state);
        const {email , username, password} = this.state;
        let user ={
            email,
            username,
            password
        }
        postUser(user).then(this.handleErrors).then( d => {
            console.log(d)
            if(d.token){
                localStorage.setItem('token', d.token)
                // this.props.history.push('/')
                this.props.backToHome()
            }else{
                alert(Object.keys(d)+" "+ d[Object.keys(d)]);
            }
          }).catch((error)=> {
            this.setState({message:"Email has been taken!"})
            })
    }

    handleErrors(response) {
        console.log(response)
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    handleInput = (event, { value, name })=>{
        // console.log(event.target, value, name)
        let message = null;
        console.log(this.checkEmail())
        if(this.checkEmail()){
            message = "Email can not be blank!"
        }else if(this.state.password ===""){
            message = "Password can not be blank!"            
        }else if(this.checkPassword()){            
            message = "Your password doesn't match!"
        }
        // console.log(message)
        this.setState({[name]:value, message})
    }

    displayMessage=()=>{
        let message1 = <Message color="red">
            {this.state.message}
            </Message>        
        return this.state.message? message1: null;                 
    }

    checkPassword=()=>{       
        return this.state.password!==this.state.passwordReenter;                 
    
    }

    checkEmail=()=>{
        return this.state.email === "";     
    }

    
    render() {
        const {email , username, password, passwordReenter} = this.state;
        return (
            <div className='signup-form'>

            <Grid textAlign='center' style={{ height: '100%'}} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                   Please Register
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
    

              </Grid.Column>
            </Grid>
          </div>
        );
    }
}

export default Signup;