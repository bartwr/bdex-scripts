import React, { Component } from 'react';
import Swap from './Swap.js';
import config from '../config.json';
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
    this.getRecentSwaps(500)
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
    return fetch( config.apiUrl + "recentswaps?limit="+limit, { cors: true } )
  }

  // renderSwap :: Object -> ReactDOM
  renderSwap(swap) {
    return <Swap swap={swap} key={swap[0] + '.' + swap[1]} />
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
