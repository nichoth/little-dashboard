// var router = require('../routes')( document.getElementById('content') );
var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');
var noop = function(){};
var reduce = require('lodash.reduce');
var struct = require("observ-struct");

var router = require('../routes')( document.getElementById('content') );

var routeHash = {
  '/videos': require('./VideosPage.js'),
  '/photos': require('./PhotosPage.js'),
  '/articles': require('./ArticlesPage.js'),
  '/videos/new': require('./VideoCreatePage.js')
};

module.exports = Router;


function Router(opts) {

  // opts = opts || {};
  // opts.onChange = opts.onChange || noop;

  var s = state({
    route: value(null),
    activeItem: value(null),
    pages: struct(reduce(routeHash, function(acc, fn, r) {
      acc[r] = struct({
        state: fn(),
        render: fn.render
      });
      return acc;
    }, {}))
  });

  s.pages['/'] = function(){return h('div', ['default route']);};


  // router.addRoute('/', function() {
  //   s.route.set('/');
  //   s.activeItem.set(null);
  //   s.renderFn.set( h('div', ['default route'].bind(null)) );
  // });

  // router.addRoute('/videos', function() {
  //   s.route.set('/videos');
  //   s.activeItem.set('videos');
  //   s.renderFn.set( require('./VideosPage.js').render.bind() );
  // });


  router.on('route', function(data) {
    s.route.set(data.route);
    s.activeItem.set(data.activeItem);
  });

  return s;

}

Router.activeItem = function(state) {
  return state.activeItem();
};

Router.render = function(state) {

  console.log(state);

  // var el = h('div', ['this is the route: ' + state.route]);
  var el = state.route ? state.pages[state.route].render( state.pages[state.route] ) : '';
  return el;
};
