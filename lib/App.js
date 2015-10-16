var h = require('virtual-dom/h');
var value = require('observ');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var router = require('routes')();
var catchLinks = require('catch-links');
var singlePage = require('single-page');
var url = require('url');

var Sidebar = require('vdom-sidebar');
// var Router = require('./components/RouterComponent.js');

var VideosPage = require('./components/VideosPage.js');
var PhotosPage = require('./components/PhotosPage.js');
var ArticlesPage = require('./components/ArticlesPage.js');
var VideoCreatePage = require('./components/VideoCreatePage.js');

var noop = function() {};


module.exports = App;

function App(opts) {

  var items = {
    videos: {
      href: '/videos',
      itemName: 'videos'
    },
    articles: {
      href: '/articles',
      itemName: 'articles'
    },
    photos: {
      href: '/photos',
      itemName: 'photos'
    }
  };

  var activeItem = value(null);

  var s = state({
    sidebar: Sidebar({
      items: items,
      activeItem: activeItem()
    }),
    pages: struct({
      '/': value(null),
      '/videos': VideosPage(),
      '/photos': PhotosPage(),
      '/articles': ArticlesPage(),
      '/videos/new': VideoCreatePage()
    }),
    renderFns: struct({
      '/': value(function() {return h('div.main-page', ['root route']);}),
      '/videos': value(VideosPage.render),
      '/photos': value(PhotosPage.render),
      '/articles': value(ArticlesPage.render),
      '/videos/new': value(VideoCreatePage.render)
    }),
    route: value(null)
    // router: Router()
  });






  var show = singlePage(function(href) {
    process.nextTick(function() {
      var path = url.parse(href).pathname;
      var m = router.match(path);
      if (m) {
        m.fn(function update(data) {
          s.route.set(data.route);
          s.sidebar.set(Sidebar({
            items: items,
            activeItem: data.activeItem
          })());
        });
      }
    });
  });
  catchLinks( document.getElementById('content'), show.bind(null) );



  router.addRoute( '/', function(update) {
    update({ route: '/', activeItem: null });
  });
  router.addRoute( '/videos', function(update) {
    update({ route: '/videos', activeItem: 'videos' });
  });
  router.addRoute( '/videos/new', function(update) {
    update({ route: '/videos/new', activeItem: 'videos' });
  } );
  router.addRoute( '/articles', function(update) {
    update({ route: '/articles', activeItem: 'articles' });
  } );
  router.addRoute( '/photos', function(update) {
    update({ route: '/photos', activeItem: 'photos' });
  } );







  return s;
}

App.render = function(state) {

  console.log(state);

  return h('div.app', [
    Sidebar.render(state.sidebar),
    state.route ? state.renderFns[state.route](state.pages[state.route]) : ''
    // renderFn(state.page)
    // h('div', ['this is the route: ' + state.route]),
    // state.route ? state.fns[state.route](state.pages[state.route]) : ''
    // Router.render(state.router)
  ]);

};
