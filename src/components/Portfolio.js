import React, { Component } from 'react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import BuySellFrom from './BuySellForm';


class Portfolio extends Component {

    buyStock=()=>{
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
                    <Segment basic>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.</Segment>
                    </Grid.Column>
                    <Divider vertical>|</Divider>
                    <Grid.Column>
                    <Segment basic>
                        <BuySellFrom
                            handleBuy={this.buyStock}
                            handleSell={this.sellStock}
                            balance={this.props.balance}
                        />
                    </Segment>
                    </Grid.Column>
                </Grid>
                
            </div>
        );
    }
}

export default Portfolio;