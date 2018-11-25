import React, { Component } from 'react';
import StockChart from './StockChart';
import { getStock6m, handleErrors } from '../Adapter';
import { parseData, getData } from '../Utility';

class ChartContainer extends Component {
    state={
        data:[],
        symbol:"C"
    }

    componentDidMount(){
        getData()
        .then(d=> this.setState({data:d}))
            
        
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextProps.symbol !== this.props.symbol){
    //         return true;
    //     }
    //     return false;
    // }
    // componentDidUpdate(nextProps){
    //     if(nextProps.symbol !== this.props.symbol){

    //     }
    // }

    getChartData=()=>{
        getStock6m(this.state.symbol)
        .then(handleErrors)
        .then( d=> {
            let data = parseData(d);
            console.log(data)
            this.setState({data})
        })
        // .then(d => this.setState({data:d}, ()=>console.log(this.state.data)))
    }


    render() {
        console.log(this.state.data.length)
		if (this.state.data.length < 1) {
			return <div></div>
		}
		return (
            <div className="small-stock-chart" >
			<StockChart data={this.state.data}/>
            </div>
		)
	}
}

export default ChartContainer;