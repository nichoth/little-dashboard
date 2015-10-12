var h = require('virtual-dom/h');
// var extend = require('xtend');
// var struct = require('observ-struct');
var value = require('observ');
var state = require('@nichoth/state');

var Sidebar = require('vdom-sidebar');
// var router = require('./routes')( document.getElementById('content') );
var noop = function() {};

// for routing
var renderFn = noop;

module.exports = App;

function App(opts) {

  opts = opts || {};
  renderFn = opts.renderFn || noop;

  var activeItem = value(opts.activeItem || null);

  var sidebarState = Sidebar({
    activeItem: activeItem(),
    items: opts.items
  });

  var s = state({
    sidebar: sidebarState,
    activeItem: activeItem,
    page: value(opts.page || null)
  });

  return s;
}

App.render = function(state) {

  return h('div.app', [
    Sidebar.render(state.sidebar),
    renderFn(state.page)
  ]);

};
