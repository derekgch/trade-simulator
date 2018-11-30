import React, { Component } from 'react';
import MainChart from './MainChart';
import { parseData } from '../Utility';
import { handleErrors , getChart} from '../Adapter';
import RangePicker from './RangePicker';
import AutoSearch from './AutoSearch';


class MainChartContainer extends Component {
    state={
        chartData: [],
        range:"6m",
        symbol:'aapl'
    }

    componentDidMount(){
        this.getChartData(this.state.symbol)
    }

    selectRange=()=>{

    }

    setSymbol=(symbol)=>{
        this.setState({symbol}, ()=>this.getChartData(this.state.symbol))
    }

    getChartData=(symbol)=>{
        // console.log("gets called", symbol)
        getChart(symbol)
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
    }


    render() {
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