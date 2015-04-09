#!/usr/bin/env node
var debug = require('debug')(pkg.name);
var app = require('./api');
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function () {
  console.log('Express listening on port: ' + 3000)
});