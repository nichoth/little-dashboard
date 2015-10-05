var h = require('virtual-dom/h');
var extend = require('xtend');
var map = require('lodash.map');

module.exports = List;

function List(opts) {
  var state = extend({
    items: {}
  }, opts);
}

List.render = function(state) {
  return h('ul', map(state.items, function(item, k) {
    return h('li', item);
  }));
};
