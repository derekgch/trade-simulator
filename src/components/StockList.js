import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class StockList extends Component {

  generateTables = () => {
    const cellColor = (status, value) => {
      switch (status) {
        case "positive":
          return <Table.Cell positive>{value}</Table.Cell>

        case "negative":
          return <Table.Cell negative>{value}</Table.Cell>

        default:
          return <Table.Cell>{value}</Table.Cell>
      }
    }
    const alphabeticOrder = (a, b) => a.stock_symbol.localeCompare(b.stock_symbol);

    return this.props.stocks.sort(alphabeticOrder).map(e => {
      let price
      if (!price) {
        price = e.price;
      } else {
        price = this.props.latestPrice[e.stock_symbol].latestPrice
      }
      let status = "";
      if (price > e.openPrice) status = "positive";
      else if (price < e.openPrice) status = "negative";

      return <Table.Row key={Date.now() + e.stock_symbol}>
        {cellColor(status, e.stock_symbol)}
        {cellColor(status, e.quantity)}
        {cellColor(status, e.openPrice)}
        {cellColor(status, price)}
        {cellColor(status, (e.quantity * price).toFixed(2))}
      </Table.Row>

    })
  }

  total = () => {
    if (Object.keys(this.props.latestPrice).length > 0
      && this.props.stocks.length > 0) {

      return this.props.stocks.reduce((acc, e) => {
        let price = this.props.latestPrice[e.stock_symbol];
        if (!price) {
          price = e.price;
        } else {
          price = this.props.latestPrice[e.stock_symbol].price
        }
        return acc + price * e.quantity
      }, 0);
    }
    return 0;
  }

  render() {
    return (
      <div className="stock-table">
        <h2>Total Value: ${this.total().toFixed(2)}</h2>

        <Table >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Shares</Table.HeaderCell>
              <Table.HeaderCell>Close($)</Table.HeaderCell>
              <Table.HeaderCell>Current($)</Table.HeaderCell>
              <Table.HeaderCell>Value($)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.generateTables()}
          </Table.Body>
        </Table>

      </div>
    );
  }
}

export default StockList;