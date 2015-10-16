var vdom = require('virtual-dom');
var mainLoop = require('main-loop');

var App = require('../lib/App.js');

var app = App();

var loop = mainLoop(app(), App.render, vdom);
document.getElementById('content').appendChild(loop.target);

app(loop.update);
