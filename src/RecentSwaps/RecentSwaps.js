import React, { Component } from 'react';
import './RecentSwaps.css';

class RecentSwaps extends Component {
  componentDidMount() {
    this.getRecentSwaps(10)
      .then((response) => {
        //response.json()
      })
      .then(function(j) {
        console.log(j)
      })
      .catch(console.log);
  }

  // getRecentSwaps :: Int -> Promise
  getRecentSwaps(limit) {
    return fetch("./get.js")
  }

  render() {
    return (
      <div className="RecentSwaps">
        <h2>recent swaps</h2>
        <div className="RecentSwaps-list">
          <div className="RecentSwaps-col">1</div>
          <div className="RecentSwaps-col">2</div>
          <div className="RecentSwaps-col">3</div>
        </div>
      </div>
    );
  }
}



export default RecentSwaps;
