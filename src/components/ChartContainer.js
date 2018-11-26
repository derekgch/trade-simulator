import React, { Component } from 'react';
import StockChart from './StockChart';


class ChartContainer extends Component {



    shouldComponentUpdate(nextProps){
        if(nextProps.symbol !== this.props.symbol || nextProps.data.length !== this.props.data.length){
            return true;
        }
        return false;
    }


    render() {
        // console.log(this.props.data.length)
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