import React, { Component } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import BuySellFrom from './BuySellForm';
import { sendTrade, handleErrors,fetchBatchQuote, fetchStockPrice , getStock6m} from '../Adapter';
import StockList from './StockList';
import ChartContainer from './ChartContainer';
import { parseData, getData } from '../Utility';


class Portfolio extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            stocks:[],
            latestPrice:{},
            chartData:[],
            validSell:false,
            validBuy:false,
            symbol:null,
        }
    }
    componentDidMount(){
        // console.log("props.stocks",this.props.stocks)
        this.setState({stocks:this.props.stocks}, this.getPrice)
        //check price every 5 seconds
        this.interval = setInterval(this.updateLatestPrice, 5000);

    }

    componentWillUnmount(){
        clearInterval(this.interval);
        this.setState({
            stocks:[],
            latestPrice:{},
            validSell:false,
            validBuy:false,
        })
    }

    //deep compare fn to check quantity change
    componentDidUpdate(prevProps, prevState){
        if(this.isUpdateNeeded(prevProps)){
            this.setState({ stocks:[...this.props.stocks]}, this.getPrice)
        }
        if(prevState.symbol !== this.state.symbol){
            if(this.state.symbol !==""){
                console.log(this.state.symbol)
                this.getChartData(this.state.symbol)
            }else 
                this.setState({chartData:[]})
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


    getChartData=(symbol)=>{
        // console.log("gets called", symbol)
        getStock6m(symbol)
        .then(handleErrors)
        .then( d=> {
            let data = parseData(d);
            // console.log(data)
            this.setState({chartData:data})
        })
        .catch(e=>{
            this.setState({chartData:[]})
            console.log("invalid symbol");
        })
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
        .then(()=>this.validateButtons(sym, quantity, price))        
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
        .then(()=>this.validateButtons(sym, quantity, price))
        .catch(()=>console.log("ERROR!Transaction Failed!"))

    }

    validateButtons=(sym, quantity, price)=>{
        this.validateBuy(sym, quantity, price);
        this.validateSell(sym, quantity);
    }

    validateBuy=(symbol,n, price)=>{
        if(n > 0 && n*price < this.props.balance && symbol !==""){
            this.setState({validBuy:true, symbol});
        }else{
            this.setState({validBuy:false, symbol});
        }
    }

    validateSell=(symbol, n)=>{
        let valid = false;
        this.state.stocks.forEach( e=>{
            // console.log(e.quantity,  n, symbol)
            if(e.stock_symbol === symbol && e.quantity >= n && n >0){
                // console.log("inside!!!!!")
                valid = true;
                return
            }
        })
        this.setState({validSell:valid, symbol})
    }


    render() {
        // console.log("portfolio",this.props.stocks, this.state.stocks)
        return (
            <div className="portfolio-container">
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
                            validBuy = {this.state.validBuy}
                            validateBuy={this.validateBuy}
                            validSell = {this.state.validSell}
                            validateSell = {this.validateSell}
                            searchData={this.props.searchData}

                        />
                    </Segment>
                    <ChartContainer symbol={this.state.symbol} data={this.state.chartData}/>

                    </Grid.Column>
                </Grid>
                
            </div>
        );
    }
}

export default Portfolio;