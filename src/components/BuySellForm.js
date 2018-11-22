import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { fetchStockQuote } from '../Adapter';
import debounce from 'lodash/debounce';

class BuySellForm extends Component {
    state={
        symbol:"",
        quantity:0,
        message:null,
        price:null,
        valid:false,
        buy:true
    }

    componentWillUnmount(){
        this.clearState();
    }

    //change buy to sell form
    componentDidUpdate(prevProps, prevState){

    }


    clearState=()=>{
        this.setState({
            symbol:"",
            quantity:0,
            message:null,
            price:null,
            valid:false
        })
    }


    handleError=(r)=>{
        if(!r.ok) throw Error;
        return r.json();
    }

    getStockPrice=debounce(()=>{
        // console.log("get price!");
        fetchStockQuote(this.state.symbol)
            .then(this.handleError)
            .then(data => {
                if(data.head!== 404){
                    let message = "Company: "+data.companyName +" || Current Price: $" + data.latestPrice
                    console.log(data)
                    this.setState({message, price:data.latestPrice, valid:true})
                }else{
                    this.setState({valid:false,message:null})
                }
            }).catch((d)=>this.setState({valid:false, message:null}))
            
    }, 300)


    handleSumbit=()=>{
        let total = this.state.price*this.state.quantity;

        if(this.state.buy && total < this.props.balance && this.state.valid){
            this.props.handleBuy(this.state.symbol, this.state.quantity, this.state.price)
        }
    }
    

    handleInput = (event, { value, name })=>{
        // console.log(event.target.value, value, name)
        switch (name) {
            case "symbol":
                this.getStockPrice();
                break;
            case "quantity":
                let regex = /[0-9]|\./;
                if(regex.test(value))
                    value= parseInt(value);
                else
                    value= "";
                break;

            default:
                break;
        }
        this.setState({[name]:value})
    }

    displayMessage = () =>{
        let message1 = <Message color="red">
            Invalid Stock Symbol
            </Message>        
        return !this.state.valid&&this.state.symbol!==""? message1: null;    
    }


    displayQuote=()=>{
        let message1 = <Message color="green">
            {this.state.message}
        </Message>        
    return this.state.valid? message1: null; 
    }

    displayTotal=()=>{
        let total = this.state.price*this.state.quantity;
        let color = total > this.props.balance ? "red" : "green"
        let reminder = color ==="red" ? " Over your budget!" : null;
        let message1 = <Message color={color}>
            Total Cost : ${total.toFixed(2)} {reminder}
        </Message>        
    return this.state.valid? message1: null; 
    }

    render() {
        const {symbol, quantity} = this.state;
        const icon = this.state.valid? "check" : "x";
        const balance = this.props.balance ? this.props.balance.toFixed(2) : 0;
        return (
            <div className="buy-sell-form">
                 <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                   Current Cash: ${balance}
                </Header>
                <Form size='large'>
                  
                    Stock Symbol:<Form.Input fluid icon={icon}
                    value={symbol} 
                    onChange={this.handleInput}
                    iconPosition='left' 
                    placeholder='Stock Symbol' 
                    name="symbol"/>
                    Number of Shares:<Form.Input
                      fluid
                      icon='circle'
                      iconPosition='left'
                      placeholder='Number of shares'
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
                {this.displayQuote()}
                {this.displayTotal()}
              </Grid.Column>
            </Grid>
                
            </div>
        );
    }
}

export default BuySellForm;