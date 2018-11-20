import React, { Component } from 'react';
import { Menu, Segment, Button } from 'semantic-ui-react'

class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name }, ()=>console.log(this.state.activeItem))
    render() {
        const { activeItem } = this.state
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
                <Menu.Item
                    position='right'
                >
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
                </Menu>
            </Segment>

        
        </div>
        );
    }
}

export default Navbar;