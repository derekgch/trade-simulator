import React, { Component } from 'react';
import NavBar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Trades from './Trades';
import Portfolio from './Portfolio';

class Container extends Component {
    state = { 
        activeItem: 'home',
        userID:null,
        userEmail:null,
        balanace:null
     }

     componentDidMount(){

     }

     componentWillUnmount(){
         this.setState({
            activeItem: 'home',
            userID:null,
            userEmail:null,
            balanace:null
         })
     }

    handleMenu=(name) => this.setState({ activeItem: name }, ()=>console.log(this.state.activeItem))

    displayContent=() =>{
        switch (this.state.activeItem) {
            case "home":
                return < Home />

            case "portfolio":
                return < Portfolio />

            case "trades":
                return < Trades />

            case "login":
                return < Login backToHome={this.handleMenu}/>

            case "signup":
                return < Signup backToHome={this.handleMenu}/>

            default: 
                return < Home />
        }
    }



    render() {
        
        return (
            <div>
                <NavBar 
                    handleMenu={this.handleMenu}
                    activeItem={this.state.activeItem}
                    />
                
                {this.displayContent()}
            </div>
        );
    }
}

export default Container;