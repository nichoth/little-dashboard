var h = require('virtual-dom/h');
var value = require('observ');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var reduce = require('lodash.reduce');

var Router = require('@nichoth/router');
var routeHash = require('./route-hash.js');
var Sidebar = require('vdom-sidebar');
var noop = function() {};


module.exports = App;

function App(opts) {

  var s = state({
    route: Router( {el: document.getElementById('content')} ),
    pages: struct(reduce(routeHash, function(acc, fn, r){
      acc[r] = fn();
      return acc;
    }, {}))
  });

  return s;
}

App.render = function(state) {

  var rh = reduce(routeHash, function(acc, pageFn, r){
    acc[r] = pageFn.render.bind(null, state.pages[r]);
    return acc;
  }, {});

  return h('div.app', [
    Router.render(rh, state.route)
  ]);

};
