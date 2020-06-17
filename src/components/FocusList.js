import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'


class FocusList extends Component {
  generateTables = () => {
    const colorCell = (color, value) => {
      if (color === "negative") return <Table.Cell negative>{value}</Table.Cell>
      if (color === "positive") return <Table.Cell positive>{value}</Table.Cell>
      return <Table.Cell >{value}</Table.Cell>
    }


    return this.props.stocks.map(e => {
      const { symbol, change, changePercent, latestPrice } = e;
      let percent = (changePercent * 100).toFixed(2).toString() + "%"
      let color = change < 0 ? "negative" : "positive";
      if (change === 0) color = "none";
      return <Table.Row key={Date.now() + symbol}>
        {colorCell(color, symbol)}
        {colorCell(color, change)}
        {colorCell(color, percent)}
        {colorCell(color, latestPrice)}
      </Table.Row>
    })

  }
  render() {
    return (
      <div>
        <h3>Trending Stocks</h3>
        <Table >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Changed($)</Table.HeaderCell>
              <Table.HeaderCell>Percent</Table.HeaderCell>
              <Table.HeaderCell>Price($)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.stocks.length > 0 ? this.generateTables() : null}
          </Table.Body>
        </Table>

      </div>
    );
  }
}

export default FocusList;