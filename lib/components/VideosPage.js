var h = require('virtual-dom/h');
var struct = require('observ-struct');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var state = require('@nichoth/state');
var oArray = require('observ-array');

var head = require('./page-head.js');
var Video = require('./Video.js');

var events = require('../event-bus.js');
var stream = require('../db-streams.js').videos;
var onChange = require('../cache.js')(stream);
var actions = require('../actions.js')( events.emitAction );
require('../adapter.js');


module.exports = VideosPage;

function VideosPage(opts) {

  var s = state({
    videos: struct({}),
  });

  // stream.on( 'data', changeState.bind(null, s) );

  // function changeState(state, data) {
  //   // hack
  //   if (data.type === 'del') {
  //     console.log(state());
  //     var vs = state().filter(function(d) {
  //       return d.index !== data.key;
  //     });
  //     state.set(vs);
  //     return;
  //   }

  //   var d = {
  //     data: data.value.data
  //   };
  //   d.data.index = data.key;
  //   d.onDelete = function() {
  //     actions.del(d.data.index);
  //   };
  //   state.push(Video( d ));
  // }

  onChange( (vs) => setVideos(s, vs) );

  return s;

}

function setVideos(state, data) {
  var vs = reduce(data, function(acc, v, k) {
    v.onDelete = function() {
      actions.delVideo(k);
    };
    acc[k] = Video(v)();
    return acc;
  }, {});
  console.log(data);
  state.videos.set(vs);
}


VideosPage.render = function(state) {

  console.log(state);

  state.videos = state.videos || {};

  var page = h('div.main-page.videos-page', [
    head('Videos'),
    'this is the videos page',
    h('br'),
    h('a', {href: '/videos/new'}, ['add a new video']),
    h('ul.video-list', {
      style: {
        listStyle: 'none',
        paddingLeft: 0
      }
    }, map(state.videos, function(v, i) {
      return h('li', {
        key: i,
        style: {
          marginBottom: '1em'
        }
      }, [Video.render(v)]);
    }))
  ]);

  return h('div', [
    require('./sidebar.js')({activeItem: 'videos'}),
    page
  ]);
};
