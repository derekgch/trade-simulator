import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class StockList extends Component {

    generateTables=()=>{
        const cellColor = (openPrice, price) => {
            let status = "";
            if(price > openPrice) status="positive";
            else if(price < openPrice) status="negative";

            switch (status) {
                case "positive":
                    return <Table.Cell positive>{price}</Table.Cell>
                    
                case "negative":
                    return <Table.Cell negative>{price}</Table.Cell>
        
                default:
                    return <Table.Cell>{price}</Table.Cell>       
            }
        }
       return this.props.stocks.map( e => {
           const price= Object.keys(this.props.latestPrice).length === 0 ? 0 : this.props.latestPrice[e.stock_symbol].price;
        //    console.log(e, this.props.latestPrice, price)
        return <Table.Row key={Date.now()+e.stock_symbol}>
            <Table.Cell>{e.stock_symbol}</Table.Cell>
            <Table.Cell>{e.quantity}</Table.Cell>
            {cellColor(e.openPrice,price)}
            <Table.Cell>{(e.quantity*price).toFixed(2)}</Table.Cell>
        </Table.Row>

       })
    }

    total =() =>{
        if(Object.keys(this.props.latestPrice).length > 0 
            && this.props.stocks.length >0){

            return this.props.stocks.reduce((acc,e)=>{                
                return acc+ this.props.latestPrice[e.stock_symbol].price*e.quantity 
            }, 0);
        }
        return 0;
    }

    render() {
        // const total = this.props.stocks.length>1?  : 0;
        return (
            <div className="stock-table">
                <h2>Total Value: ${this.total().toFixed(2)}</h2>
                
                  <Table >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Symbol</Table.HeaderCell>
                        <Table.HeaderCell>Shares</Table.HeaderCell>
                        <Table.HeaderCell>Price($)</Table.HeaderCell>
                        <Table.HeaderCell>Value($)</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {/* <Table.Row>
                        <Table.Cell negative>Cell</Table.Cell>
                        <Table.Cell positive>Cell</Table.Cell>
                        <Table.Cell>Cell</Table.Cell>
                    </Table.Row> */}
                    {this.generateTables()}
                    </Table.Body>
                </Table>
                
            </div>
        );
    }
}

export default StockList;