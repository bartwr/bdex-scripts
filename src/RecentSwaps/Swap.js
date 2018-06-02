import React, { Component } from 'react';
// import * as R from 'ramda';
import './Swap.css';

class Swap extends Component {

  constructor(props) {
    super(props)

    this.debug = false;
    this.state = { swapStatus: {} }
  }

  componentDidMount() {
    let self = this;

    let swapStatusParams = {
      requestid: this.props.swap[0],
      quoteid: this.props.swap[1]
    }

    // Get swap status on page load
    this.getSwapStatus(swapStatusParams)
      .then(res => res.text())
      .then(function(json) {
        json = JSON.parse(json)
        json = JSON.parse(json)
        self.debug && console.log('Swap Status: ', json)
        self.setState({ "swapStatus": json })
      })
      .catch(console.log);
  }

  // getSwapStatus :: 
  getSwapStatus(params) {
    return fetch( "http://localhost:3001/api/swapstatus?requestid="+params.requestid+"&quoteid="+params.quoteid );
  }

  render() {
    // If this swap did not fully succeed: do not render
    if( ! this.props.swap[2] )
      return(<div key={this.props.swap[0] + "-" + this.props.swap[1]} />)

    // Put the swap info into an useful format
    let swapInfo = [], succeededSwap = this.props.swap[2]
    for(let key in succeededSwap)
      swapInfo.push({ "key": key, "val": succeededSwap[key] })

    // Render the swap
    return (
      <div key={this.props. swap[0] + "-" + this.props.swap[1]} className="RecentSwaps-row">
        <div className="RecentSwaps-col"><b>{this.state.swapStatus}</b></div>
        <div className="RecentSwaps-col" style={{ "color": swapInfo[0].val < 0 ? "red" : "green" }}><b>{swapInfo[0].key}</b><br />{swapInfo[0].val}</div>
        <div className="RecentSwaps-col" style={{ "color": swapInfo[1].val < 0 ? "red" : "green" }}><b>{swapInfo[1].key}</b><br />{swapInfo[1].val}</div>
        <div className="RecentSwaps-col"><b>{swapInfo[2].val}</b></div>
      </div>
    )
  }
}

export default Swap;
