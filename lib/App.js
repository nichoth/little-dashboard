var h = require('virtual-dom/h');
var extend = require('xtend');
var struct = require('observ-struct');
var value = require('observ');

var Sidebar = require('vdom-sidebar');
var router = require('./routes')( document.getElementById('content') );
var noop = function() {};

// set by router
var renderFn = noop;

module.exports = App;

function App(opts) {
  var copy = extend(opts);

  var state = struct({
    sidebar: Sidebar({
      activeItem: copy.activeItem,
      items: copy.items
    }),
    page: value(null)
  });

  router.on('route', function(data) {

    var sidebarObj = Sidebar({
      activeItem: data.activeItem,
      items: copy.items
    }).call(null);

    renderFn = data.renderFn;
    if (data.page && typeof data.page === 'function') {
      state.page.set(data.page());
    }
    else {
      state.page.set({});
    }
    state.sidebar.set(sidebarObj);
  });

  return state;
}

App.render = function(state) {

  return h('div.app', [
    Sidebar.render(state.sidebar),
    renderFn(state.page)
  ]);

};
