import React, { Component } from 'react';
import MainChart from './MainChart';
import { parseData } from '../Utility';
import { handleErrors , getChart} from '../Adapter';
import RangePicker from './RangePicker';
import AutoSearch from './AutoSearch';
import debounce from 'lodash/debounce';


class MainChartContainer extends Component {
    state={
        chartData: [],
        range:"6m",
        symbol:'aapl'
    }

    componentDidMount(){
        this.getChartData(this.state.symbol)
    }

    selectRange=(range)=>{
        console.log("range", range)
        this.setState({range}, ()=>this.getChartData(this.state.symbol, range))
    }

    setSymbol=(symbol)=>{
        this.setState({symbol}, ()=>this.getChartData(this.state.symbol))
    }

    getChartData= debounce((symbol, range="6m")=>{
        // console.log("gets called", symbol)
        getChart(symbol, range)
        .then(handleErrors)
        .then( d=> {
            let data = parseData(d);
            // console.log(data)
            this.setState({chartData:data})
        })
        .catch(e=>{
            this.setState({chartData:[]})
            console.log("invalid symbol");
        })
    }, 500)


    render() {
        // console.log( this.state.chartData.length)
        return (
            <div>
                <AutoSearch    setSymbol={this.setSymbol}
                    searchData = {this.props.searchData}/>

                {this.state.chartData.length > 0?
                <div>
                <RangePicker selectRange={this.selectRange}/>
                <MainChart data={this.state.chartData}/>
                </div>
                : null
                }
            </div>
        );
    }
}

export default MainChartContainer;