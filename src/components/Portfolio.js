import React, { Component } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import BuySellFrom from './BuySellForm';
import { sendTrade, handleErrors,fetchBatchQuote } from '../Adapter';
import StockList from './StockList';

class Portfolio extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            stocks:[],
        }
    }
    componentDidMount(){
        // this.setState({stocks:this.props.stocks})
    }

    //need to make a deep compare fn to check quantity change
    componentDidUpdate(prevProps, prevState){
        if(prevProps.stocks.length !== this.props.stocks.length){
            this.setState({ stocks:[...this.props.stocks]}, this.getOpenPrice)
        }
    }
    getOpenPrice=()=>{
        const symbols=this.state.stocks.map(e=>e.stock_symbol);
        fetchBatchQuote(symbols)
            .then(handleErrors)
            .then(this.storePriceToState)
            .catch(()=>console.log("fetchBathQuote ERROR!"))
    }

    storePriceToState=(data)=>{
        console.log(data)
        let result =[];
        this.state.stocks.forEach(e=>{
            console.log(data[e.stock_symbol].quote.open)
            result.push({...e, 
                openPrice:data[e.stock_symbol].quote.open, 
                price:data[e.stock_symbol].quote.latestPrice})
        })
        this.setState({stocks:result})
    }

    updateLatestPrice=()=>{

    }
    

    //needs to update stocks to include current prices and status (positive/negative)

    buyStock=(sym, quantity, price)=>{
        const token = localStorage.getItem('token');
        const trade ={sym, quantity, price, action:"buy"};
        sendTrade(trade, this.props.userID, token)
        .then(handleErrors)
        .then(this.props.afterTrade)
        .catch(()=>console.log("ERROR!Transaction Failed!"))
        console.log("buystock")
    }
    sellStock=()=>{
        console.log("sell stock")

    }


    render() {
        console.log("portfolio",this.props.stocks, this.state.stocks)
        return (
            <div>
                <Grid columns={2} relaxed>
                    <Grid.Column>
                    <Segment basic>
                        <StockList 
                            stocks={this.state.stocks}
                        />
                    
                    </Segment>
                    </Grid.Column>
                    <Divider vertical>|</Divider>
                    <Grid.Column>
                    <Segment basic>
                        <BuySellFrom
                            handleBuy={this.buyStock}
                            handleSell={this.sellStock}
                            balance={this.props.balance}
                            selected = {null}
                        />
                    </Segment>
                    </Grid.Column>
                </Grid>
                
            </div>
        );
    }
}

export default Portfolio;