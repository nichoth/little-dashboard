var router = require('routes')();
var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var noop = function(){};

var router = require('./router.js')( document.getElementById('content') );

module.exports = Router;

function Router(opts) {

  opts = opts || {};
  opts.onChange = opts.onChange || noop;

  var s = state({
    route: value(null),
  });

  router.on('route', function(data) {
    s.route.set(data.route);
  });

  return s;

}

Router.activeItem = function(state) {
  return state.activeItem;
};

Router.render = function(state) {
  var el = h('div', ['this is the route: ' + state.route]);
  return el;
};
