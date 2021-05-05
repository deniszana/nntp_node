const path = require("path");
require('dotenv').config({path: './config/.env'});

var NNTP = require('nntp'),
inspect = require('util').inspect;

var c = new NNTP();
c.on('ready', function() {
  c.groups('fr.*', function(err, list) {
    if (err) throw err;
    console.log(list.length);
    list.forEach(element => console.log(element));
  });
});
c.on('error', function(err) {
  console.log('Error: ' + err);
});
c.on('close', function(had_err) {
  console.log('Connection closed');
});
c.connect({
  host: process.env.nntp_host,
  user: process.env.nntp_user,
  password: process.env.nntp_password
});