import React, { Component } from 'react';
import StockChart from './StockChart';


class ChartContainer extends Component {



    shouldComponentUpdate(nextProps){
        // console.log(this.props.symbol, nextProps.symbol)
        if(nextProps.symbol !== this.props.symbol 
            || this.isDataChange(nextProps.data, this.props.data)){
            
                return true;
        }
        return false;
    }

    isDataChange=(next, now)=>{
        if(next.length !== now.length) return true;
        if(next.length >0 && now.length >0)
            if(next[0].close !== now[0].close)
                return true;
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