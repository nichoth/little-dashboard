var h = require('virtual-dom/h');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var oArray = require('observ-array');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var observ = require('observ');

var wrapper = require('./page-wrapper.js');
var DomainItem = require('./domain-item.js');

var db = require('../db-streams.js').db;
var actions = require('../actions.js')(db);

module.exports = page;


function page(opts) {

  opts = opts || {};
  var stream = opts.stream;

  var s = state({
    itemName: observ(opts.itemName),
    itemNamePlural: observ(opts.itemNamePlural),
    items: oArray([]),
    // activeItem: observ(null),
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
      domainPlural: s.itemNamePlural(),
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
  var subRoute = getSubRoute(state, route);

  var listPage = [
    h('a', {href: '/'+state.itemNamePlural+'/new'}, [
      'add a new ' + state.itemName
    ]),
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

  var pageContent = subRoute ? subRoute : listPage;
  // var pageContent = listPage;

  return wrapper({itemNamePlural: state.itemNamePlural}, pageContent);

};


function getSubRoute(state, route) {
  console.log(arguments);
  if (!route.action) { return; }
  if (route.action === 'new') {
    return state.subRoutes['new'].render(state.subRoutes.new.state);
  }
  return state.subRoutes.edit.render(state.subRoutes.edit.state);
}
