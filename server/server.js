var http = require('http');
var path = require('path');
var fs = require('fs');
var debug = require('debug')('EBMChatServer');
var express = require('express');
var lessMiddleware = require('less-middleware');
var _ = require('underscore');
var cas = require('grand_master_cas');
var conf = require('./conf.js');

function setup() 
{

}

function start(port, host, callback) 
{
    // init app
    var app = setup();
    // start server
    server = http.createServer(app);
    server.listen(port ? port : conf.http.port, host ? host : conf.http.host, function(err) 
    {
        if(err) 
        {
            return debug(err);
        }
        console.log('Starting server on ' + server.address().address + ':' + server.address().port);
        if(callback) 
        {
            callback();
        }
    });
}

function stop(callback) 
{
    server.close(callback);
}

module.exports = 
{
  setup: setup,
  start: start,
  stop : stop
};

