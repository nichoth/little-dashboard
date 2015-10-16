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

  var items = {
    videos: {
      href: '/videos',
      itemName: 'videos'
    },
    articles: {
      href: '/articles',
      itemName: 'articles'
    },
    photos: {
      href: '/photos',
      itemName: 'photos'
    }
  };

  var activeItem = value(null);

  var s = state({
    sidebar: Sidebar({
      items: items,
      activeItem: activeItem()
    }),
    route: Router(),
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
    Sidebar.render(state.sidebar),
    Router.render(rh, state.route)
  ]);

};
