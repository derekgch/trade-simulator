import React, { Component } from 'react';
import { fetchUserInfo } from '../Adapter';
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
        userName:null,
        stocks:[],
        trades:[],
        balance:null
     }

     componentDidMount(){
        this.checkToken()
     }

     componentWillUnmount(){
        this.clearState();
     }

     clearState=()=>{
        this.setState({
            userID:null,
            userEmail:null,
            userName:null,
            stocks:[],
            trades:[],
            balance:null
         })
     }

     handleErrors(response) {
        // console.log(response)
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

     checkToken=()=>{
        let token = localStorage.getItem('token');
        if(token){
            this.parseToken(token)
        }else{
            this.clearState();
        }
     }

     parseToken=(token)=>{
         let userInfo = JSON.parse(atob(token.split(".")[1]))

         fetchUserInfo(token, userInfo.id)
            .then(this.handleErrors)
            .then((data)=>this.setState({
                userID:userInfo.id,
                userEmail:userInfo.email,
                userName:data.user,
                stocks:data.stocks,
                trades:data.trades,
                balance:data.balance

            }, ()=> console.log(this.state)))
         console.log(userInfo)
     }
    
    handleBackHome=()=>{
        this.setState({activeItem:'home'}, ()=>this.checkToken())
    }

    handleLogout=()=>{
        localStorage.removeItem('token');
        this.checkToken();
        // console.log("logout")
    }

    handleMenu=(name) => this.setState({ activeItem: name })

    displayContent=() =>{

        switch (this.state.activeItem) {
            case "home":
                return < Home />

            case "portfolio":
                return < Portfolio />

            case "trades":
                return < Trades />

            case "login":
                return < Login backToHome={this.handleBackHome}/>

            case "signup":
                return < Signup backToHome={this.handleBackHome}/>

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
                    userName={this.state.userName}
                    handleLogout={this.handleLogout}

                    />
                
                {this.displayContent()}
            </div>
        );
    }
}

export default Container;