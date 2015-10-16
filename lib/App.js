var h = require('virtual-dom/h');
var value = require('observ');
var state = require('@nichoth/state');

var Sidebar = require('vdom-sidebar');
var Router = require('./components/RouterComponent.js');
var noop = function() {};

// var router = require('./routes/router.js')( document.getElementById('content') );

// for routing
// var renderFn = noop;

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

  // opts = opts || {};
  // renderFn = opts.renderFn || noop;

  // var activeItem = value(opts.activeItem || null);

  // var sidebarState = Sidebar({
  //   activeItem: activeItem(),
  //   items: opts.items
  // });

  // var s = state({
  //   sidebar: sidebarState,
  //   activeItem: activeItem,
  //   page: opts.page || value(null)
  // });

  var activeItem = value(null);

  var s = state({
    sidebar: Sidebar({
      items: items,
      activeItem: activeItem()
    }),
    router: Router()
    // renderFn: value(null),
    // route: value(null),
    // items: items,
    // pages: require('./route-hash.js')(),
    // fns: {
    //   '/': function() { return h('div', ['default route']); },
    //   '/videos': require('./components/VideosPage.js').render,
    //   '/photos': require('./components/PhotosPage.js').render,
    //   '/articles': require('./components/ArticlesPage.js').render,
    //   '/videos/new': require('./components/VideoCreatePage.js').render
    // }
  });

  // router.on('route', function(data) {
  //   activeItem.set(data.activeItem);
  //   s.route.set(data.route);
  //   // s.pageData.set(data.pageData);
  //   // s.renderFn.set(data.renderFn);
  // });

  return s;
}

App.render = function(state) {

  console.log(state);

  return h('div.app', [
    Sidebar.render(state.sidebar),
    // renderFn(state.page)
    // h('div', ['this is the route: ' + state.route]),
    // state.route ? state.fns[state.route](state.pages[state.route]) : ''
    Router.render(state.router)
  ]);

};
