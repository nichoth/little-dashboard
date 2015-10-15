var router = require('routes')();
var catchLinks = require('catch-links');
var singlePage = require('single-page');
var url = require('url');
var h = require('virtual-dom/h');

var videoStore = require('../store.js')();

module.exports = function(el) {

  var EventEmitter = require('events').EventEmitter;
  var bus = new EventEmitter();
  var emit = bus.emit.bind(bus);

  var videoBus = new EventEmitter();
  var videoEmit = videoBus.emit.bind(videoBus);

  var show = singlePage(function(href) {
    process.nextTick(function() {
      var path = url.parse(href).pathname;
      var m = router.match(path);
      if (m) {
          m.fn();
      }
    });
  });
  catchLinks( el, show.bind(null) );

  router.addRoute( '/', function() {
    emit('route', {
      route: '/',
      renderFn: function() {
        return h('div.main-page', ['default route']);
      }
    });
  });
  router.addRoute( '/videos', require('./video-route.js')(emit, videoStore) );
  router.addRoute( '/videos/new',
    require('./video-new-route.js')(emit, videoEmit) );
  router.addRoute( '/articles', require('./articles-route.js')(emit) );
  router.addRoute( '/photos', require('./photos-route.js')(emit) );

  return bus;

};
