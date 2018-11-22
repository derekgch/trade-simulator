import React, { Component } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import BuySellFrom from './BuySellForm';
import { sendTrade, handleErrors } from '../Adapter';
import StockList from './StockList';

class Portfolio extends Component {

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
        return (
            <div>
                <Grid columns={2} relaxed>
                    <Grid.Column>
                    <Segment basic>
                        <StockList 
                            stocks={this.props.stocks}
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