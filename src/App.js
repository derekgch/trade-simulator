import React, { Component } from 'react';
import './App.css';
import Container from './components/Container'
// import NavBar from './components/Navbar'

class App extends Component {
  render() {
    const height = window.innerHeight;
    return (
      <div className="App" style={{ height }}>

        <Container />
      </div>
    );
  }
}

export default App;
