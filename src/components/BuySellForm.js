import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import { fetchStockQuote, handleErrors } from '../Adapter';
import debounce from 'lodash/debounce';
import AutoSearch from './AutoSearch';

class BuySellForm extends Component {
    state={
        symbol:"",
        quantity:0,
        message:null,
        price:null,
        valid:false,
    }

    componentDidMount(){
        this.interval = setInterval(this.getPeriodicUpdate, 5000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.clearState();
    }


    clearState=()=>{
        this.setState({
            symbol:"",
            quantity:0,
            message:null,
            price:null,
            valid:false,
        })
    }

    getPeriodicUpdate=()=>{
        if(this.state.valid && this.state.symbol!==""){

            this.getStockPrice()
        }
    }

    getStockPrice=debounce(()=>{
        // console.log("get price!");
        fetchStockQuote(this.state.symbol)
            .then(handleErrors)
            .then(data => {
                if(data.head!== 404){
                    let message = "Company: "+data.companyName +" || Current Price: $" + data.latestPrice
                    // console.log(data)
                    this.setState({message, price:data.latestPrice, valid:true})
                }else{
                    this.setState({valid:false,message:null})
                }
            }).catch((d)=>this.setState({valid:false, message:null}))
            
    }, 300)


    handleBuySumbit=()=>{
        let total = this.state.price*this.state.quantity;
        if(this.props.validBuy && total < this.props.balance && this.state.valid){
            this.props.handleBuy(this.state.symbol, this.state.quantity, this.state.price);
        }
    }

    handleSellSubmit=()=>{
        this.props.handleSell(this.state.symbol, this.state.quantity, this.state.price);
    }
    
    handleSearchInput=(value)=>{
        if(value !== "")this.getStockPrice();
        value=value.toUpperCase();
        this.setState({symbol:value}, this.validate);
    }

    handleInput = (event, { value, name })=>{
        // console.log(event.target.value, value, name)
        switch (name) {
            case "symbol":
                if(value !== "")this.getStockPrice();
                value=value.toUpperCase();
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
        this.setState({[name]:value}, this.validate);
    }

    validate=()=>{
        this.props.validateBuy(this.state.symbol, this.state.quantity, this.state.price);
        this.props.validateSell(this.state.symbol, this.state.quantity);
    }


    buyButton=()=>{
        if(this.state.valid && this.props.validBuy)
            return <Button positive onClick={this.handleBuySumbit}>Buy</Button>
        return <Button positive disabled >Buy</Button>
    }
    sellButton=()=>{
        // console.log("sell button", this.props.validSell)
        if(this.props.validSell){
            return <Button negative onClick={this.handleSellSubmit}>Sell</Button>
        }
        return <Button negative disabled >Sell</Button>
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
        const {quantity} = this.state;
        const balance = this.props.balance ? this.props.balance.toFixed(2) : 0;
        return (
            <div className="buy-sell-form">
                 <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 530, height:380 }}>
                <Header as='h2' color='black' textAlign='center'>
                   Current Cash: ${balance}
                </Header>
                <Form size='large'>
                

                    <AutoSearch fluid
                        searchData={this.props.searchData}
                        setSymbol={this.handleSearchInput}
                    
                    />
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

                      <Button.Group fluid>
                        {this.buyButton()}
                        <Button.Or />
                        {this.sellButton()}
                    </Button.Group>
                    
                  
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