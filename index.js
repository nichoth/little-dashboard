var mainLoop = require('main-loop');
var vdom = require('virtual-dom');

var App = require('./lib/App.js');

module.exports = function(el, opts) {

  var app = App(opts);

  var loop = mainLoop( app(), App.render, vdom );
  el.appendChild(loop.target);

  app(loop.update);

};
