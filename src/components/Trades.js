import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { fetchUserHistory, handleErrors} from '../Adapter';


class Trades extends Component {
    state={
        trades:[]
    }

    componentDidMount(){
        this.getTrades();
    }

    getTrades=()=>{
        const token = localStorage.getItem('token');

        fetchUserHistory(token, this.props.userID)
            .then(handleErrors)
            .then(this.storeData)
            .catch(()=> console.log("ERROR"))
    }

    storeData=(data)=>{
        this.setState({trades:data.trades})
    }

    generateTables=()=>{
        const compFn =(a,b) =>{ return b.created_at.localeCompare(a.created_at)}
        return this.state.trades.sort(compFn).map(e=>{
            // console.log(e);
            let {created_at, stock_symbol, quantity, price, action} = e;

            let estTime = new Date(created_at);
            // console.log(estTime)
            return <Table.Row key ={Date.now()+stock_symbol+quantity+created_at}>
        <Table.Cell>{estTime.toDateString()}</Table.Cell>
        <Table.Cell>{stock_symbol}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
        <Table.Cell>{price}</Table.Cell>
        <Table.Cell>{action}</Table.Cell>
        </Table.Row>
        })
    }
    
    render() {
        return (
            <div className="trades-table">
                <h2>
                Trade History
                </h2>

                <Table >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Symbol</Table.HeaderCell>
                        <Table.HeaderCell>Shares</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Buy/Sell</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.trades.length>0 ? this.generateTables():null}

                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Trades;
