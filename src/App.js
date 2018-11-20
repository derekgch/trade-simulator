import React, { Component } from 'react';
import './App.css';
import Container from './components/Container'
import NavBar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Container />
      </div>
    );
  }
}

export default App;
