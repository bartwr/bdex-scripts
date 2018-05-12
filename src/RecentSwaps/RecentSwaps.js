import React, { Component } from 'react';
import * as R from 'ramda';
import './RecentSwaps.css';

class RecentSwaps extends Component {
  constructor(props) {
    super(props)

    this.debug = false;
    this.state = { "recentSwaps": {} }
  }

  componentDidMount() {
    let self = this;

    // Get recent swaps on page load 
    this.getRecentSwaps(10)
      .then(res => res.text())
      .then(function(json) {
        json = JSON.parse(json)
        json = JSON.parse(json)
        self.debug && console.log('Recent swaps: ', json.swaps)
        self.setState({ "recentswaps": json.swaps })
      })
      .catch(console.log);

    // Every minute: reload page
    setTimeout(function() {
      window.location.reload(false); 
    }, 60 * 1000)
  }

  // getRecentSwaps :: Int -> Promise
  getRecentSwaps(limit) {
    return fetch( "http://localhost:3001/api/recentswaps", { cors: true } )
  }

  // renderSwap :: Object -> ReactDOM
  renderSwap(swap) {
    // If this swap did not fully succeed: do not render
    if( ! swap[2] )
      return(<div key={swap[0] + "-" + swap[1]} />)

    // Put the swap info into a useful format
    let swapInfo = [], succeededSwap = swap[2]
    for(let key in succeededSwap)
      swapInfo.push({ "key": key, "val": succeededSwap[key] })

    // Render the swap
    return (
      <div key={swap[0] + "-" + swap[1]} className="RecentSwaps-row">
        <div className="RecentSwaps-col" style={{ "color": swapInfo[0].val < 0 ? "red" : "green" }}><b>{swapInfo[0].key}</b><br />{swapInfo[0].val}</div>
        <div className="RecentSwaps-col" style={{ "color": swapInfo[1].val < 0 ? "red" : "green" }}><b>{swapInfo[1].key}</b><br />{swapInfo[1].val}</div>
        <div className="RecentSwaps-col"><b>{swapInfo[2].val}</b></div>
      </div>
    )
  }

  render() {
    return (
      <div className="RecentSwaps">
        <h2>recent swaps</h2>
        {R.map(this.renderSwap, (this.state.recentswaps || []))}
      </div>
    );
  }
}

export default RecentSwaps;
