import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

class StockCard extends Component {
  render() {
    if (this.props.data) {
      const { companyName, latestPrice, symbol, change, avgTotalVolume, week52High, week52Low } = this.props.data.quote;
      let arrow = change < 0 ? "arrow down" : "arrow up";
      let color = change < 0 ? "red" : "green";
      if (change === 0) {
        color = "black";
        arrow = "";
      }
      const fontColor = { color }
      return (
        <Card color={color} fluid>
          <Card.Content>
            <Card.Header style={fontColor}>

              ${latestPrice}-{symbol}-${change}
              <Icon name={arrow} />
            </Card.Header>
            <Card.Meta>
              <span >52-Week High:{week52High} Low:{week52Low}</span>
            </Card.Meta>
            <Card.Description>{companyName}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            Volumn: {avgTotalVolume}
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default StockCard;
