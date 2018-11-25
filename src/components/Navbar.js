import React, { Component } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react'

class Navbar extends Component {
    

    handleItemClick = (e, { name }) => this.props.handleMenu(name)

    displayButtons=()=>{
        const { activeItem } = this.props;
        let login =  <Menu.Item position='right'>
                <Button  
            name='signup' 
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
            color='green'>
            Signup
            </Button>
            <Button  
                name='login' 
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                style={{ marginLeft: '0.5em' }} 
                color='green'>
                Login
            </Button>
        </Menu.Item>

        let logout= <Menu.Item position='right'>
            Welcome, {this.props.userName}
            <Button  
                name='logout' 
                onClick={this.props.handleLogout}
                style={{ marginLeft: '2em' }} 
                color='green'>
                Logout
            </Button>
        
        </Menu.Item>


        if(this.props.userName){
            return logout
        }else{
            return login
        }
    }


    render() {
        const { activeItem } = this.props
        return (
            <div>
            <Segment inverted>
                <Menu inverted pointing secondary>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item
                    name='portfolio'
                    active={activeItem === 'portfolio'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='trades'
                    active={activeItem === 'trades'}
                    onClick={this.handleItemClick}
                />
                {/* <Menu.Item
                    position='right'
                    name='signup'
                    active={activeItem === 'signup'}
                    onClick={this.handleItemClick}
                /> */}

                {this.displayButtons()}
                </Menu>

            </Segment>

        
        </div>
        );
    }
}

export default Navbar;