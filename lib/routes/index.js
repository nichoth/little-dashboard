var router = require('routes')();

module.exports = function Router(emit) {

  router.addRoute( '/videos', require('./video-route.js')(emit) );
  router.addRoute( '/articles', require('./articles-route.js')(emit) );
  router.addRoute( '/photos', require('./photos-route.js')(emit) );

  return router;

};
