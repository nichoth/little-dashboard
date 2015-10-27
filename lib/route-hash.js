var h = require('virtual-dom/h');

var streams = require('./db-streams.js');
var dp = require('./components/domain-page.js');

function Root() {}
Root.render = function(){
  return h('div', [
    require('./components/sidebar.js')(),
    h('div.main-page', ['root route'])
  ]);
};

function domainPage(component, args) {
  var page = component.bind(component, args);
  page.render = component.render;
  return page;
}

module.exports = {
  '/': Root,
  '/videos/:action?': domainPage(dp, {
    stream: streams.videos,
    itemName: 'video',
    itemNamePlural: 'videos',
    subRoutes: {
      'new': require('./components/create-a-thing.js')
    }
  }),
  '/photos/:action?': domainPage(dp, {
    stream: streams.photos,
    itemName: 'photo',
    itemNamePlural: 'photos'
  }),
  '/articles/:action?': domainPage(dp, {
    stream: streams.articles,
    itemName: 'article',
    itemNamePlural: 'articles'
  })
};
