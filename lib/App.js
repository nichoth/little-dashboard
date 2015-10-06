var h = require('virtual-dom/h');
var extend = require('xtend');
var struct = require('observ-struct');

var Sidebar = require('vdom-sidebar');
var Router = require('./routes')( document.getElementById('content') );

module.exports = App;

function App(opts) {
  var copy = extend(opts);

  var state = struct({
    sidebar: Sidebar({
      activeItem: copy.activeItem,
      items: copy.items
    }),
    route: Router()
  });

  return state;
}

App.render = function(state) {

  console.log(state);

  return h('div.app', [
    Sidebar.render(state.sidebar),
    Router.render(state.route)
  ]);

};
