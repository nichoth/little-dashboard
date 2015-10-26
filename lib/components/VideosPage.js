var h = require('virtual-dom/h');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var state = require('@nichoth/state');
var oArray = require('observ-array');

var head = require('./page-head.js');
var Video = require('./Video.js');

var dbStreams = require('../db-streams.js');
var stream = dbStreams.videos;
var db = dbStreams.db;

var actions = require('../actions.js')(db);

module.exports = VideosPage;

function VideosPage(opts) {

  var s = state({
    videos: oArray([]),
  });

  stream.on( 'data', changeState.bind(null, s.videos) );

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
      data: data.value.data
    };
    d.data.index = data.key;
    d.onDelete = function() {
      actions.delVideo( data.key );
    };
    state.push(Video( d ));
  }

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
