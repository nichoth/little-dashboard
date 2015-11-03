var mainLoop = require('main-loop');
var vdom = require('virtual-dom');

var App = require('../lib/App.js');

var app = App({
  schema: require('../example/schema.js')
});

var loop = mainLoop( app(), App.render, vdom );
document.getElementById('content').appendChild(loop.target);

app(loop.update);
