'use strict';

require('dotenv').load();
var express = require('express');
var BaseService = require('./service');
var inherits = require('util').inherits;
var fs = require('fs');
var pkg = require('../package');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

require('../public/app_api/models/db');
require('../public/app_api/config/passport');
var routesApi = require('../public/app_api/routes/index');
var appExpress = express();

appExpress.use(logger('dev'));
appExpress.use(bodyParser.json({limit: '50mb'}));
//appExpress.use(bodyParser.urlencoded({ extended: false }));
appExpress.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
appExpress.use(cookieParser());

appExpress.use(passport.initialize());
appExpress.use('/api', routesApi);

var InsightUI = function(options) {
  BaseService.call(this, options);
  // we don't use the options object for routePrefix and apiPrefix, since the
  // client must be rebuilt with the proper options. A future version of 
  // Bitcore should allow for a service "build" step to make this better.
  this.apiPrefix = pkg.insightConfig.apiPrefix;
  this.routePrefix = pkg.insightConfig.routePrefix;
};

InsightUI.dependencies = ['insight-api'];

inherits(InsightUI, BaseService);

InsightUI.prototype.start = function(callback) {
  this.indexFile = this.filterIndexHTML(fs.readFileSync(__dirname + '/../public/index-template.html', {encoding: 'utf8'}));
  setImmediate(callback);
};

InsightUI.prototype.getRoutePrefix = function() {
  return this.routePrefix;
};

InsightUI.prototype.setupRoutes = function(app, express) {
  var self = this;
  app.use(express.static(__dirname + '/../public'));
  // if not in found, fall back to indexFile (404 is handled client-side)
  app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.send(self.indexFile);
  });
};

InsightUI.prototype.filterIndexHTML = function(data) {
  var transformed = data;
  if (this.routePrefix !== '') {
    transformed = transformed.replace('<base href="/"', '<base href="/' + this.routePrefix + '/"');
  }
  return transformed;
};

module.exports = InsightUI;
module.exports = appExpress;
