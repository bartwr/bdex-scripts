var userpass = 'default';

var check_status = function() {
  // return fetch("http://192.168.178.108:7783", { body: "{\"userpass\\\":\\\"$userpass\\\",\\\"method\\\":\\\"recentswaps\\\",\\\"limit\\\":2}", headers: { "Content-Type": "application/x-www-form-urlencoded" }, method: "POST" });
  return fetch("http://127.0.0.1:7783?method=recentswaps&limit=10", { method: "GET" });
}

check_status();

// Comments are below:

// #!/bin/bash
// source userpass
// curl --url "http://127.0.0.1:7783" --data "{\"userpass\":\"$userpass\",\"method\":\"recentswaps\",\"limit\":2}"

// return fetch('http://127.0.0.1:7783', {
//   method: 'post', 
//   headers: new Headers({
//     'Content-Type': 'application/json'
//   }),
//   body: JSON.stringify({
//     userpass: userpass,
//     method: 'recentswaps',
//     limit: 2
//   })
// });


