import React, { Component } from 'react';
import StockChart from './StockChart';


class ChartContainer extends Component {



    shouldComponentUpdate(nextProps, nextState){
        // console.log(nextState.data.length !== this.state.length )
        // console.log( "nextProps", nextProps, "thisprops", this.props, nextState.data.length,this.state.data.length)
        if(nextProps.symbol !== this.props.symbol || nextProps.data.length !== this.props.data.length){
            console.log("reCharted!!")
            return true;
        }
        return false;
    }

    // getChartData=(symbol)=>{
    //     console.log("gets called", symbol)
    //     getStock6m(symbol)
    //     .then(handleErrors)
    //     .then( d=> {
    //         let data = parseData(d);
    //         // console.log(data)
    //         this.setState({data})
    //     })
    //     .catch(e=>{console.log("invalid symbol")})
    // }


    render() {
        console.log(this.props.data.length)
		if (this.props.data.length < 1) {
			return <div></div>
        }
        const {symbol} = this.props;
		return (
            <div className="small-stock-chart" >
            <h3>Stock Symbol:  {symbol}</h3>
			<StockChart data={this.props.data} symbol={symbol}/>
            </div>
		)
	}
}

export default ChartContainer;