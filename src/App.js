import React, { Component } from 'react';
import RecentSwaps from './RecentSwaps/RecentSwaps.js';
import logo from './komodo-logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecentSwaps />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">bdex-scripts</h1>
        </header>
        <p className="App-intro">
          On this page you'll find some tools for managing your BarterDEX setup.
        </p>
      </div>
    );
  }
}

export default App;
