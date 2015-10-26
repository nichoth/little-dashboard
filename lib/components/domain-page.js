var h = require('virtual-dom/h');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var oArray = require('observ-array');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var observ = require('observ');

var head = require('./page-head.js');
var DomainItem = require('./domain-item.js');

var dbStreams = require('../db-streams.js');
var db = dbStreams.db;
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

// function setVideos(state, data) {
//   var vs = reduce(data, function(acc, v, k) {
//     v.onDelete = function() {
//       actions.delVideo(k);
//     };
//     acc[k] = Video(v)();
//     return acc;
//   }, {});
//   console.log(data);
//   state.videos.set(vs);
// }


page.render = function(state) {

  console.log(state);

  state.items = state.items || [];
  var schema = state.schema;

  var page = h('div.main-page.videos-page', [
    head('Videos'),
    'this is the videos page',
    h('br'),
    h('a', {href: '/'+state.itemNamePlural+'/new'}, ['add a new ' + state.itemName]),
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
  ]);

  return h('div', [
    require('./sidebar.js')({activeItem: state.itemNamePlural}),
    page
  ]);
};
