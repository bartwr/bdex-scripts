const express = require("express");
const fs = require("fs");
var request = require('request');
var cors = require('cors')

const config = require('./config.json')

var clientServerOptions = {
  uri: 'http://127.0.0.1:7783',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

const app = express();
app.use(cors())

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get(config.apiUrl + "api/recentswaps", (req, res) => {

  requestParams = Object.assign({}, clientServerOptions, {
    body: JSON.stringify({
      userpass: config.userpass,
      method: 'recentswaps',
      limit: (req.query.limit ? req.query.limit : 500)
    })
  })
  request(requestParams, function (error, response) {
    console.log(error, response.body);
    res.json(response.body)
    return;
  });

});

app.get(config.apiUrl + "api/swapstatus", (req, res) => {

  // Check on required fields
  if( ! req.query.requestid) throw new Error('No request ID given');
  if( ! req.query.quoteid)   throw new Error('No quote ID given');

  requestParams = Object.assign({}, clientServerOptions, {
    body: JSON.stringify({
      userpass: config.userpass,
      method: 'swapstatus',
      requestid: req.query.requestid,
      quoteid: req.query.quoteid
    })
  })
  request(requestParams, function (error, response) {
    console.log(error, response.body);
    res.json(response.body)
    return;
  });

});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
