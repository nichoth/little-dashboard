var h = require('virtual-dom/h');
var value = require('observ');
var state = require('@nichoth/state');

var Sidebar = require('vdom-sidebar');
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
    page: opts.page || value(null)
  });

  return s;
}

App.render = function(state) {

  console.log(state);

  return h('div.app', [
    Sidebar.render(state.sidebar),
    renderFn(state.page)
  ]);

};
