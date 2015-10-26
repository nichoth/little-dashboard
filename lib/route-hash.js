var h = require('virtual-dom/h');

var streams = require('./db-streams.js');

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
  '/videos': domainPage(require('./components/domain-page.js'), {
    stream: streams.videos,
    itemName: 'video',
    itemNamePlural: 'videos'
  }),
  '/photos': require('./components/PhotosPage.js'),
  '/articles': domainPage(require('./components/domain-page.js'), {
    stream: streams.articles,
    itemName: 'article',
    itemNamePlural: 'articles'
  }),
  '/videos/new': require('./components/VideoCreatePage.js')
};
