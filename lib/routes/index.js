var router = require('routes')();
var store = require('../store.js')();

module.exports = function Router(emit) {

  router.addRoute( '/videos', require('./video-route.js')(store, emit) );
  router.addRoute( '/articles', require('./articles-route.js')(emit) );
  router.addRoute( '/photos', require('./photos-route.js')(emit) );

  return router;

};
