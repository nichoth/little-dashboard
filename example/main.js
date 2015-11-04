var dashboard = require('../');
var schema = require('./schema.js');
var rootEl = document.getElementById('content');

dashboard(rootEl, schema);
