import React, { Component } from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import { fetchUserHistory} from '../Adapter';


class Trades extends Component {
    state={
        trades:[],
        meta:{},
        activePage:1,
    }

    componentDidMount(){
        this.getTrades();
    }

    componentWillUnmount(){
        this.setState({
            trades:[],
            meta:{},
            activePage:1,
        })
    }

    handleErrors = (response)=>{
            // console.log(response)
    if (!response.ok) {
        throw Error(response.statusText);
    }
    // console.log(response)
    // console.log(response.headers.get('Link'))

    // response.headers.forEach(function(val, key) { console.log(key + ' -> ' + val); });
    return response.json();
    }

    getTrades=(page=1)=>{
        const token = localStorage.getItem('token');

        fetchUserHistory(token, this.props.userID, page)
            .then(this.handleErrors)
            .then(this.storeData)
            .catch(()=> console.log("ERROR"))
    }

    storeData=(data)=>{
        this.setState({trades:data.trades, meta:data.meta, activePage:data.meta.current_page })
    }

    generateTables=()=>{
        return this.state.trades.map(e=>{
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

    handlePageSelect=(event, {activePage})=>{
        this.getTrades(activePage);
        // console.log(activePage)
    }

    topPages =(key)=>{
        if(this.state.meta.total_pages && this.state.meta.total_pages > 1)
            return <Pagination key={key} 
                    onPageChange={this.handlePageSelect}
                    defaultActivePage={this.state.meta.current_page} 
                    totalPages={this.state.meta.total_pages} />

        return null;
    }
    
    render() {
        return (
            <div className="trades-table">
                <h2>
                Trade History
                </h2>
                {this.topPages("top_pagination")}
                <Table >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Symbol</Table.HeaderCell>
                        <Table.HeaderCell>Shares</Table.HeaderCell>
                        <Table.HeaderCell>Price($)</Table.HeaderCell>
                        <Table.HeaderCell>Buy/Sell</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.trades.length>0 ? this.generateTables():null}
                    </Table.Body>
                    </Table>
                    {this.topPages("down_pagination")}

                    {/* {this.state.meta.totalPages === 1?null :this.bottomPages("999bottom_pagination")} */}
            </div>
        );
    }
}

export default Trades;
