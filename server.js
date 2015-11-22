var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var fs = require('fs');
var router = require('routes')();
var shoe = require('shoe');
var multilevel = require('multilevel');

var db = require('./example/data/db.js')();
var schema = require('./example/schema.js');
var createRoutes = function(item) {
  return [
    '/'+item.itemNamePlural,
    '/'+item.itemNamePlural+'/new',
    '/'+item.itemNamePlural+'/:id'
  ];
};

// serve the bundle
function appRoute(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream('public/index.html')
    .pipe(res);
}

// add routes to router
var routes = schema.forEach(function(item) {
  createRoutes(item).forEach( function(r) {
    router.addRoute(r, appRoute);
  } );
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
