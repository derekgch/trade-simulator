import React, { Component } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import BuySellFrom from './BuySellForm';
import { sendTrade, handleErrors,fetchBatchQuote, fetchStockPrice } from '../Adapter';
import StockList from './StockList';

class Portfolio extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            stocks:[],
            latestPrice:{},
            validSell:false,
        }
    }
    componentDidMount(){
        this.setState({stocks:this.props.stocks}, this.getPrice)
        //check price every 5 seconds
        // this.getPriceInterval = setInterval(this.updateLatestPrice, 5000);

    }

    componentWillUnmount(){
        // clearInterval(this.getPriceInterval);
    }

    //need to make a deep compare fn to check quantity change
    componentDidUpdate(prevProps, prevState){
        if(this.isUpdateNeeded(prevProps)){
            this.setState({ stocks:[...this.props.stocks]}, this.getPrice)
        }
    }

    isUpdateNeeded=(prevProps)=>{
        if(prevProps.stocks.length !== this.props.stocks.length)
            return true;
        let changed = false;
        this.props.stocks.forEach((e,i)=>{
            if(prevProps.stocks[i].quantity !== e.quantity)
                changed=true;
        })
        return changed;
    }


    getPrice=()=>{
        this.getOpenPrice();
        // this.updateLatestPrice();
    }
    
    getOpenPrice=()=>{
        const symbols=this.state.stocks.map(e=>e.stock_symbol);
        fetchBatchQuote(symbols)
            .then(handleErrors)
            .then(this.storePriceToState)
            .then(this.updateLatestPrice)
            .catch(()=>console.log("fetchBathQuote ERROR!"))
    }

    storePriceToState=(data)=>{
        // console.log(data)
        let result =[];
        this.state.stocks.forEach(e=>{
            // console.log(data[e.stock_symbol].quote.open)
            result.push({...e, 
                openPrice:data[e.stock_symbol].quote.open, 
                price:data[e.stock_symbol].quote.latestPrice
            })
        })
        this.setState({stocks:result})
    }

    updateLatestPrice=()=>{
        const symbols=this.state.stocks.map(e=>e.stock_symbol);

        fetchStockPrice(symbols)
            .then(handleErrors)
            .then(data=>this.setState({latestPrice:data}))
            .catch(console.log);
        console.log("GET PRICE ONLY!");
    }
    
    buyStock=(sym, quantity, price)=>{
        const token = localStorage.getItem('token');
        const trade ={sym, quantity, price, action:"BUY"};
        sendTrade(trade, this.props.userID, token)
        .then(handleErrors)
        .then(this.props.afterTrade)
        .then(()=>this.checkSell(sym, quantity))
        .catch(()=>console.log("ERROR!Transaction Failed!"))
        console.log("buystock")
    }
    sellStock=(sym, quantity, price)=>{
        console.log("sell stock", sym, quantity, price)
        const token = localStorage.getItem('token');
        const trade ={sym, quantity, price, action:"SELL"};
        sendTrade(trade, this.props.userID, token)
        .then(handleErrors)
        .then(this.props.afterTrade)
        .then(()=>this.checkSell(sym, quantity))
        .catch(()=>console.log("ERROR!Transaction Failed!"))

    }

    checkSell=(symbol, n)=>{
        let valid = false;
        this.state.stocks.forEach( e=>{
            // console.log(e.quantity,  n, symbol)
            if(e.stock_symbol === symbol && e.quantity >= n && n >0){
                // console.log("inside!!!!!")
                valid = true;
                return
            }
        })
        this.setState({validSell:valid})
    }


    render() {
        // console.log("portfolio",this.props.stocks, this.state.stocks)
        return (
            <div>
                <Grid columns={2} relaxed>
                    <Grid.Column>
                    <Segment basic>
                        <StockList 
                            stocks={this.state.stocks}
                            latestPrice={this.state.latestPrice}
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
                            validSell = {this.state.validSell}
                            checkSell = {this.checkSell}
                        />
                    </Segment>
                    </Grid.Column>
                </Grid>
                
            </div>
        );
    }
}

export default Portfolio;