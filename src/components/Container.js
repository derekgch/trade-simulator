import React, { Component } from 'react';
import NavBar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Trades from './Trades';
import Portfolio from './Portfolio';

class Container extends Component {
    state = { activeItem: 'home' }
    handleMenu=(name) => this.setState({ activeItem: name }, ()=>console.log(this.state.activeItem))

    displayContent=() =>{
        switch (this.state.activeItem) {
            case "home":
                return < Home />
                break;
            case "portfolio":
                return < Portfolio />
                break;

            case "trades":
                return < Trades />
                break;

            case "login":
                return < Login />
                break;
            case "signup":
                return < Signup />
                break;
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