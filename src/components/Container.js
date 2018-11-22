import React, { Component } from 'react';
import { fetchUserInfo, handleErrors } from '../Adapter';
import NavBar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Trades from './Trades';
import Portfolio from './Portfolio';

class Container extends Component {
    state = { 
        activeItem: 'portfolio',
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
            activeItem: 'home',
            userID:null,
            userEmail:null,
            userName:null,
            stocks:[],
            trades:[],
            balance:null
         })
     }

     afterTrade=(data)=>{
         const userInfo={id:this.state.userID, email:this.state.userEmail};
         this.saveDataToState(data, userInfo);

        // console.log(data)
        // this.setState(data)
     }



     checkToken=()=>{
        let token = localStorage.getItem('token');
        if(token){
            this.parseToken(token)
        }else{
            this.clearState();
        }
     }

     saveDataToState=(data, userInfo)=>{
        this.setState({
            userID:userInfo.id,
            userEmail:userInfo.email,
            userName:data.user,
            stocks:data.stocks,
            trades:data.trades,
            balance:data.balance

        },()=> console.log(this.state))
     }

     parseToken=(token)=>{
         let userInfo = JSON.parse(atob(token.split(".")[1]))

         fetchUserInfo(token, userInfo.id)
            .then(handleErrors)
            .then((d)=> this.saveDataToState(d, userInfo))
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
                return < Portfolio 
                            balance={this.state.balance}
                            userID={this.state.userID}
                            stocks={this.state.stocks} 
                            afterTrade={this.afterTrade}/>

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