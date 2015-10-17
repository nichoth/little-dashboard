var h = require('virtual-dom/h');
var value = require('observ');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var reduce = require('lodash.reduce');
var Router = require('@nichoth/router');

var routeHash = require('./route-hash.js');
var noop = function() {};


module.exports = App;

function App(opts) {

  var s = state({
    route: Router( {el: document.getElementById('content')} ),
    pages: struct(reduce(routeHash, function(acc, fn, routeStr){
      acc[routeStr] = fn();
      return acc;
    }, {}))
  });

  return s;
}

App.render = function(state) {

  var rh = reduce(routeHash, function(acc, pageFn, routeStr){
    acc[routeStr] = pageFn.render.bind(null, state.pages[routeStr]);
    return acc;
  }, {});

  return h('div.app', [
    Router.render(rh, state.route)
  ]);

};
