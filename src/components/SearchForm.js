import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import { fetchStockQuote, handleErrors } from '../Adapter';
import AutoSearch from './AutoSearch';



class SearchForm extends Component {
  state = {
    symbol: "GOOG",
    quote: null
  }

  componentDidMount() {
    this.getStockPrice();
  }

  handleChange = (event, { value }) => {
    this.setState({ symbol: value.toUpperCase() }, this.getStockPrice);
  }

  getStockPrice = debounce(() => {
    fetchStockQuote(this.state.symbol)
      .then(handleErrors)
      .then(data => {
        if (data.head !== 404) {
          this.setState({ quote: data })
        } else {
          this.setState({ quote: "Not Found" })
        }
      }).catch((d) => this.setState({ quote: "Not Found" }))

  }, 300)

  setSymbol = (symbol) => {
    this.setState({ symbol }, this.getStockPrice)
  }


  render() {
    if (this.state.quote !== null && this.state.quote !== "Not Found") {
      var { week52High, week52Low, companyName, latestPrice, change, latestTime } = this.state.quote;
    }
    let arrow = change < 0 ? "arrow down" : "arrow up";
    let color = change < 0 ? "red" : "green";
    if (change === 0) {
      color = "black";
      arrow = "";
    }

    const fontColor = { color }

    return (
      <Card fluid color={color} >
        <Card.Content>
          <Card.Header style={fontColor}>
            <AutoSearch
              searchData={this.props.searchData}
              setSymbol={this.setSymbol}
            />
                Price: ${latestPrice} Change: ${change} <Icon name={arrow} />
          </Card.Header>
          <Card.Meta>
            <span > 52-week High:{week52High} Low:{week52Low}</span>
          </Card.Meta>
          <Card.Description>Company: {companyName},  {latestTime}</Card.Description>
        </Card.Content>
      </Card>
    );

  }
}

export default SearchForm;