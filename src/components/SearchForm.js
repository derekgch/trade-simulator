import React, { Component } from 'react';
import { Card, Icon ,Form} from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import { fetchStockQuote, handleErrors } from '../Adapter';



class SearchForm extends Component {
    state={
        symbol:"GOOG",
        quote:null
    }

    componentDidMount(){
        this.getStockPrice();
    }

    handleChange=(event, {value})=>{
        // console.log(value)
        this.setState({symbol:value.toUpperCase()}, this.getStockPrice);
    }

    getStockPrice = debounce(()=>{
        // console.log("get price!");
        fetchStockQuote(this.state.symbol)
            .then(handleErrors)
            .then(data => {
                if(data.head!== 404){
                    // console.log(data)
                    this.setState({quote:data})
                }else{
                    this.setState({quote:"Not Found"})
                }
            }).catch((d)=>this.setState({quote:"Not Found"}))
            
    }, 300)


    render() {
        // var high=0, low=0, companyName="", latestPrice=0, change=0, latestTime="";
        if(this.state.quote!==null && this.state.quote !=="Not Found"){
             var {high, low, companyName, latestPrice, change, latestTime} = this.state.quote;
        }

        return (
            <Card fluid>
            <Card.Content>
            <Card.Header >
            <Form >
                <Form.Group >
                    <Form.Input 
                        width={6} 
                        placeholder="Search Stock Symbols"
                        icon='search'
                        iconPosition='left'
                        value={this.state.symbol}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                </Form>
                Price: ${latestPrice} Change: ${change} Time: {latestTime}
            </Card.Header>
            <Card.Meta>
                    <span >High:{high} Low:{low}</span>
                </Card.Meta>
                <Card.Description>Company: {companyName}</Card.Description>
            </Card.Content>
            </Card>
        );
        
    }
}

export default SearchForm;