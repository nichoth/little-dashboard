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
  return h('div.'+state.domain+'-item.domain-item', [
    h('span.domain-item-title', [state.title]),
    h('div.domain-item-buttons', [
      h('button.domain-item-edit', {
        title: 'edit',
        onclick: function(ev) {
          ev.preventDefault();
          console.log(ev);
        }
      }, [
      ]),
      h('button.domain-item-delete', {
        title: 'delete',
        onclick: function(ev) {
          ev.preventDefault();
          console.log(ev);
          console.log(state.index);
          state.handles.onDelete();
        }
      }, [])
    ])
  ]);
};
