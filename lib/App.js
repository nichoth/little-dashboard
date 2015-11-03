var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var observ = require('observ');
var reduce = require('lodash.reduce');
var Router = require('@nichoth/router');


module.exports = App;

function App(opts) {

  opts = opts || {};
  var schema = opts.schema;

  var routeHash = require('./route-hash.js')(schema);

  var s = state({
    route: Router(),
    pages: struct(
      reduce(routeHash, function(acc, fn, routeStr){
        acc[routeStr] = fn();
        return acc;
      }, {})
    ),
    renderFns: struct(
      reduce(routeHash, function(acc, pageFn, routeStr) {
        acc[routeStr] = observ(pageFn.render);
        return acc;
      }, {})
    )
  });

  return s;
}


App.render = function(state) {

  var rh = reduce(state.renderFns, function(acc, fn, routeStr){
    acc[routeStr] = fn.bind(null, state.pages[routeStr]);
    return acc;
  }, {});

  return h('div.app', [
    Router.render(rh, state.route)
  ]);

};
