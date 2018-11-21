import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import _debouce from 'lodash';

class BuySellForm extends Component {
    state={
        symbol:"",
        quantity:"",
        message:null,
        valid:false
    }

    handleInput = (event, { value, name })=>{
        // console.log(event.target, value, name)
        let message = null;
        this.setState({[name]:value, message})
    }

    displayMessage = () =>{
        let message1 = <Message color="red">
            Invalid Stock Symbol
            </Message>        
        return !this.state.valid&&this.state.symbol!==""? message1: null;    
    }
    render() {
        const {symbol, quantity} = this.state;
        const balance = this.props.balance ? this.props.balance.toFixed(2) : 0;
        return (
            <div className="buy-sell-form">
                 <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                   Current Cash: ${balance}
                </Header>
                <Form size='large'>
                  
                    Stock Symbol:<Form.Input fluid icon='x'
                    value={symbol} 
                    onChange={this.handleInput}
                    iconPosition='left' 
                    placeholder='Stock Symbol' 
                    name="symbol"/>
                    Amout of Shares:<Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='quantity'
                      onChange={this.handleInput}
                      name="quantity"
                      type="integer"
                      value={quantity}

                    />
  
                    <Button color='green' fluid size='medium' onClick={this.handleSumbit} position="right">
                      Buy
                    </Button>
                    
                  
                </Form>
                {this.displayMessage()}
              </Grid.Column>
            </Grid>
                
            </div>
        );
    }
}

export default BuySellForm;