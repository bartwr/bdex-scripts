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

app.get("/api/recentswaps", (req, res) => {

  requestParams = Object.assign({}, clientServerOptions, {
    body: JSON.stringify({
      userpass: config.userpass,
      method: 'recentswaps',
      limit: 10
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
