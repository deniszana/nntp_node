const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");

require('dotenv').config({path: './config/.env'});

var NNTP = require('nntp'),
        inspect = require('util').inspect;
 
    var c = new NNTP();
    var nbmsg = 0;
    var msgLow = 0;
    var msgHigh = 0;
    c.on('ready', function() {
      c.group('fr.comp.internet.tor', function(err, count, low, high) {
         let nbmsg = count;
         let msgLow = low;
         let msgHigh = high;
        console.log('count=',nbmsg,msgLow, msgHigh);
        for (let i = 0; i < nbmsg; i++) {
          console.log('for',i);
          if (i != 0) {
            c.next( function(err,articleNum,msgID){
              console.log('\n');
              console.log(articleNum, msgID);
             });
          }

          c.article(function(err, n, id, headers, body) {
            if (err) throw err;
            console.log('Article #' + n,'Article ID: ' + id);
            console.log(headers.subject);
    
           // console.log('Article headers: ' + inspect(headers));
          // console.log('Article body: ' + inspect(body.toString()));
          });
        }
  

        if (err) throw err;
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
