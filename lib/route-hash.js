var h = require('virtual-dom/h');

function Root() {}
Root.render = function(){ return h('div', [
  require('./components/sidebar.js')(),
  h('div.main-page', ['root route'])
]); };

module.exports = {
  '/': Root,
  '/videos': require('./components/VideosPage.js'),
  '/photos': require('./components/PhotosPage.js'),
  '/articles': require('./components/ArticlesPage.js'),
  '/videos/new': require('./components/VideoCreatePage.js')
};
