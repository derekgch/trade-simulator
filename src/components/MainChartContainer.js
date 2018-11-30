import React, { Component } from 'react';
import MainChart from './MainChart';
import { parseData } from '../Utility';
import { handleErrors , getStock6m, getChart} from '../Adapter';


class MainChartContainer extends Component {
    state={
        chartData: []
    }

    componentDidMount(){
        this.getChartData("aapl")
    }

    getChartData=(symbol)=>{
        // console.log("gets called", symbol)
        getStock6m(symbol)
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
        if(this.state.chartData.length <1) return null;
        return (
            <div>
                <MainChart data={this.state.chartData}/>
            </div>
        );
    }
}

export default MainChartContainer;