var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var value = require('observ');


module.exports = Item;


function Item(opts) {
  opts = opts || {};
  var s = state({
    domain: value( opts.domain ),
    domainPlural: value( opts.domainPlural ),
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
      h('a.domain-item-edit', {
        href: '/'+state.domainPlural+'/'+state.index,
        title: 'edit',
        onclick: function(ev) {
          console.log(ev, 'edit', state.index);
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
