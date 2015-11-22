var h = require('virtual-dom/h');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var oArray = require('observ-array');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var observ = require('observ');

var wrapper = require('./page-wrapper.js');
var DomainItem = require('./domain-item.js');


module.exports = page;


function page(opts) {

  opts = opts || {};
  var stream = opts.stream;
  var deleteAction = opts.deleteAction;


  var s = state({
    itemName: observ(opts.itemName),
    itemNamePlural: observ(opts.itemNamePlural),
    items: oArray([])
  });

  stream.on( 'data', changeState.bind(null, s.items) );

  function changeState(state, event) {
    // hack
    if (event.type === 'del') {
      console.log(state());
      var vs = state().filter(function(d) {
        return d.index !== event.key;
      });
      state.set(vs);
      return;
    }

    // put
    var d = {
      domain: s.itemName(),
      domainPlural: s.itemNamePlural(),
      data: event.value.data
    };
    d.data.index = event.key;
    d.onDelete = function() {
      deleteAction( event.key );
    };
    state.unshift(DomainItem( d ));
  }

  return s;

}


page.render = function(state, route) {

  console.log('domain', arguments);
  state.items = state.items || [];

  var listPage = [
    h('ul.'+state.itemName+'-list.domain-item-list', {
      style: {
        listStyle: 'none',
        paddingLeft: 0
      }
    }, map(state.items, function(item, i) {
      return h('li', {
        key: i,
        style: {
          marginBottom: '1em'
        }
      }, [ DomainItem.render(item) ]);
    }))
  ];

  var pageContent = listPage;

  return wrapper({
      name: state.itemName,
      namePlural: state.itemNamePlural
    },
    require('./nav.js').create(
      'add a new ' + state.itemName,
      '/'+state.itemNamePlural+'/new'
    ),
    pageContent
  );

};
