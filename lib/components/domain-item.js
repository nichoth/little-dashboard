var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');


module.exports = Item;


function Item(opts) {
  opts = opts || {};
  var s = state({
    domain: value( opts.domain ),
    title: value( opts.data.title || '' ),
    index: opts.data.index,
    metadata: opts.metadata || [],
    handles: {
      onDelete: opts.onDelete
    }
  });

  return s;
}

Item.render = function(state) {
  return h('div.'+state.domain+'-item', [
    'this is a ' +state.domain+ ' item',
    h('br'),
    h('span.title', ['title: ' + state.title]),
    h('br'),
    h('button', {
      onclick: function(ev) {
        ev.preventDefault();
        console.log(ev);
        console.log(state.index);
        state.handles.onDelete();
      }
    }, 'delete')
  ]);
};
