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
    }

    componentDidMount(){
        getFocus().then(handleErrors).then(data => this.setState({focus:data}))
        fetchBatchQuote(["DIA", "SPY", "IWM", "QQQ"])
            .then(handleErrors)
            .then(data => this.setState({etfs:data}))
        
    }

    render() {
        const name = this.props.userID ? this.props.username : "guest";
        const message =this.props.userID 
            ? "Today's snapshot:" 
            : "Please sign up or login for full functionalities.";
        return (
            <div className="home-page">
                <h1>
                    Welcome, {name}! 
                </h1>
                <h3>
                    {message}
                </h3>

                <Grid columns={2} relaxed>
                    <Grid.Column>
                    <Segment basic>
                    <FocusList stocks={this.state.focus}/>
                    </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <h2>Find Stock:</h2>
                        <SearchForm />

                        <CardContainer etfs={this.state.etfs}/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Home;