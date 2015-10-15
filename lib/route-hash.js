module.exports = function() {
  return {
    '/videos': require('./components/VideosPage.js')({store: require('./store.js')()}),
    '/photos': require('./components/PhotosPage.js')(),
    '/articles': require('./components/ArticlesPage.js')(),
    '/videos/new': require('./components/VideoCreatePage.js')({emit: {on: function(){}}})
  };
};
