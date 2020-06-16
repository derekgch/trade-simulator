import React, { Component } from 'react';
import { getFocus, handleErrors, fetchBatchQuote } from '../Adapter';
import { Grid, Segment } from 'semantic-ui-react'
import FocusList from './FocusList';
import CardContainer from './CardContainer';
import SearchForm from './SearchForm';

class Home extends Component {
    state={
        focus:[],
        etfs:[],
        serverUP:false,
    }

    componentDidMount(){
        this.getInfo();
        this.interval= setInterval(this.getInfo , 5000);
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    getInfo=()=>{
        getFocus().then(handleErrors).then(data => this.setState({focus:data})).catch( err => console.log("Error:", err))
        fetchBatchQuote(["DIA", "SPY", "IWM", "QQQ"])
            .then(handleErrors)
            .then(data => this.setState({etfs:data, serverUP:true}))
            .catch(d=>console.log("Fetch ETFs ERROR!"))
    }

    render() {
        const userName = this.props.userID ? this.props.userName : "guest";
        const message =this.props.userID 
            ? "Today's snapshot:" 
            : "Please sign up or login for full functionalities.";
        const herokuMessage = this.state.serverUP ? null : "Please allow 10s for heroku backend to boot.";
        return (
            <div className="home-container">
                <h1>
                    Welcome, {userName}! 
                </h1>
                <h3>
                    {message}
                    {herokuMessage}
                </h3>

                <Grid columns={2} relaxed>
                    <Grid.Column>
                    <Segment basic>
                    <FocusList stocks={this.state.focus}/>
                    </Segment>
                    </Grid.Column>

                    <Grid.Column >
                        <h2>Find Stock:</h2>
                        <SearchForm searchData={this.props.searchData} sytle={{top:"7px"}}/>

                        <CardContainer etfs={this.state.etfs}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Home;