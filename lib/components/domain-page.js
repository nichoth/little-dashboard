var h = require('virtual-dom/h');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var oArray = require('observ-array');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var observ = require('observ');

var head = require('./page-head.js');
var DomainItem = require('./domain-item.js');

var db = require('../db-streams.js').db;
var actions = require('../actions.js')(db);

module.exports = page;


// stream and item name
function page(opts) {

  opts = opts || {};
  var stream = opts.stream;

  var s = state({
    itemName: observ(opts.itemName),
    itemNamePlural: observ(opts.itemNamePlural),
    items: oArray([]),
    subRoutes: struct( reduce(opts.subRoutes, function(acc, fn, str) {
      acc[str] = struct({
        state: fn(),
        render: observ(fn.render)
      });
      return acc;
    }, {}))
  });

  stream.on( 'data', changeState.bind(null, s.items) );

  function changeState(state, data) {
    // hack
    if (data.type === 'del') {
      console.log(state());
      var vs = state().filter(function(d) {
        return d.index !== data.key;
      });
      state.set(vs);
      return;
    }

    // put
    var d = {
      domain: s.itemName(),
      data: data.value.data
    };
    d.data.index = data.key;
    d.onDelete = function() {
      actions.del( data.key );
    };
    state.push(DomainItem( d ));
  }

  return s;

}


page.render = function(state, route) {

  console.log(arguments);
  state.items = state.items || [];

  var listPage = [
    h('a', {href: '/'+state.itemNamePlural+'/new'}, [
      'add a new ' + state.itemName
    ]),
    h('ul.'+state.itemName+'-list', {
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

  var pageContent = route.action ?
    state.subRoutes[route.action].render(state.subRoutes[route.action].state) :
    listPage
  ;

  var page = h('div.main-page.'+state.itemNamePlural+'-page', [
    head(state.itemNamePlural),
    'this is the ' +state.itemNamePlural+ ' page',
    h('br'),
    pageContent
  ]);

  return h('div', [
    require('./sidebar.js')({activeItem: state.itemNamePlural}),
    page
  ]);
};
