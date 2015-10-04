var h = require('virtual-dom/h');
var extend = require('xtend');

var Sidebar = require('vdom-sidebar');

module.exports = App;

function App(opts) {
  var copy = extend(opts);

  var state = {
    sidebar: Sidebar({
      activeItem: copy.activeItem,
      items: copy.items
    }),
    activeItem: copy.activeItem,
    page: copy.page
  };

  return state;
}

App.render = function(state) {

  return h('div.app', [
    Sidebar.render(state.sidebar),
    state.activeItem ? state.page : ''
  ]);

};
