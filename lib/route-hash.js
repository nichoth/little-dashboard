var h = require('virtual-dom/h');

var streams = require('./db-streams.js');
var dp = require('./components/domain-page.js');
var cp = require('./components/create-a-thing.js');
var actions = require('./actions.js')(streams.db);

function Root() {}
Root.render = function(){
  return h('div', [
    require('./components/sidebar.js')(),
    h('div.main-page', ['root route'])
  ]);
};

function curryPage(component, args) {
  var page = component.bind(component, args);
  page.render = component.render;
  return page;
}

module.exports = {
  '/': Root,
  '/videos/:action?': curryPage(dp, {
    stream: streams.videos,
    itemName: 'video',
    itemNamePlural: 'videos',
    subRoutes: subRoutes(actions.createVideo)
  }),
  '/photos/:action?': curryPage(dp, {
    stream: streams.photos,
    itemName: 'photo',
    itemNamePlural: 'photos',
    subRoutes: subRoutes(actions.createPhoto)
  }),
  '/articles/:action?': curryPage(dp, {
    stream: streams.articles,
    itemName: 'article',
    itemNamePlural: 'articles',
    subRoutes: subRoutes(actions.createArticle)
  })
};


function subRoutes(action) {
  return {
    'new': curryPage(cp, {
      action: action
    })
  };
}
