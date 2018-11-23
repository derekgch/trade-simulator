import React, { Component } from 'react';
import Card from './Card';
import { Grid } from 'semantic-ui-react'

class CardContainer extends Component {
    
    render() {
        // console.log(this.props.etfs)

        return (
            <div>
                

                <h3>Major ETFs</h3>
                <Grid columns={2}>
                    <Grid.Row>
                    <Grid.Column >
                    <Card data ={this.props.etfs["IWM"]} />
                    </Grid.Column>

                    <Grid.Column>
                    <Card data ={this.props.etfs["DIA"]}/>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    <Grid.Column>
                    <Card data={this.props.etfs["SPY"]}/>
                    </Grid.Column>
                    <Grid.Column>
                    <Card data={this.props.etfs["QQQ"]}/>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>

                
                
            </div>
        );
    }
}

export default CardContainer;