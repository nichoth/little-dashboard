var h = require('virtual-dom/h');
var extend = require('xtend');
var observ = require('observ');
var observeVarhash = require('observ-varhash');
var observStruct = require('observ-struct');

var Sidebar = require('vdom-sidebar');

module.exports = App;

function App(opts) {

  var copy = extend({
    items: [],
    activeItem: '',
    renderFn: function() {},
    pageState: {}
  }, opts);

  var state = observStruct({
    sidebar: Sidebar({
      activeItem: copy.activeItem,
      items: copy.items,
    }),
    activeItem: observ(copy.activeItem),
    renderFn: copy.renderFn,
    pageState: copy.pageState
  });

  console.log(state());

  return state;
}

App.render = function(state) {

  console.log(state);

  return h('div.app', [
    Sidebar.render(state.sidebar),
    state.activeItem ? state.renderFn(state.pageState) : ''
  ]);

};
