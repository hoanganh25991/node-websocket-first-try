var WebSocketServer = require('ws').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {
  var id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()), function () { /* ignore errors */ });
  }, 1000);
  
  console.log('started client interval');
  
  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });

  ws.on('message', (msg) => {
    console.log(msg);
  });
});

server.on('request', app);

server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});
