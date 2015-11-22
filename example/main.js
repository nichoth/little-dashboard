var dashboard = require('../');
var schema = require('./schema.js');
var streams = require('./db-streams.js');
var actions = require('./actions.js')(streams.db);
var rootEl = document.getElementById('content');

dashboard(rootEl, {
  schema: schema,
  streams: streams,
  actions: actions
});
