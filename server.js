var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var fs = require('fs');
var router = require('routes')();

var shoe = require('shoe');
var multilevel = require('multilevel');

var db = require('./data/db.js')();


// router.addRoute('/api/:name', function(req, res, params) {
//   res.setHeader("Content-Type", "text/html");
//   res.end('you requested ' + params.name);
// });

function appRoute(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream('public/index.html')
    .pipe(res);
}

var routes = [
  '/photos',
  '/photos/new',
  '/photos/:id',
  '/articles',
  '/articles/new',
  '/articles/:id',
  '/videos',
  '/videos/new',
  '/videos/:id'
];

// serve static app at all routes
routes.forEach(function(routeStr) {
  router.addRoute(routeStr, appRoute);
});

var server = http.createServer(function(req, res) {

  var m = router.match(req.url);
  if (m) {
    m.fn(req, res, m.params);
  }
  else {
    ecstatic(req, res);
  }

}).listen(8000);
console.log('listening on :8000');



// websockets
var sock = shoe(function(stream) {
  stream.pipe( multilevel.server(db) ).pipe(stream);
});
sock.install(server, '/sock');
