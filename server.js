var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var fs = require('fs');
var router = require('routes')();
var foreach = require('lodash.foreach');

var wsock = require('websocket-stream');
var multilevel = require('multilevel');

var db = require('./data/db.js');

router.addRoute('/api/:name', function(req, res, params) {
  res.setHeader("Content-Type", "text/html");
  res.end('you requested ' + params.name);
});

function appRoute(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream('public/index.html')
    .pipe(res);
}

// serve static app at all routes
foreach( require('./lib/route-hash.js'), function(fn, routeStr) {
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



wsock.createServer({ server: server }, function(stream) {
  stream.pipe( multilevel.server(db) ).pipe(stream);
});






// var level = require('level');
// var multilevel = require('multilevel');
// var http = require('http');
// var browserify = require('browserify');
// var shoe = require('shoe');

// // A read stream ends when it reaches the end of the key range.
// // `level-live-stream` makes a stream that stays open and emits events
// // whenever the db changes.
// var liveStream = require('level-live-stream');


// // server
// var server = http.createServer(function(req, res) {
//   if (req.url == '/') {
//     res.end('<script type="text/javascript" src="/bundle.js"></script>');
//   } else if (req.url == '/bundle.js') {
//     browserify(__dirname + '/app.js', { debug:true })
//       .bundle()
//       .pipe(res);
//   } else {
//     res.end('nope');
//   }
// });

// server.listen(8000);
// console.log('listening on port 8000');

// // db
// var db = level(__dirname + '/db', {
//   valueEncoding: 'json',
// });

// // this lets multilevel clients use `db.liveStream()` via the manifest
// liveStream.install(db);

// // the manifest is necessary for the client (browser-side multilevel) to use
// // our level plugins.
// multilevel.writeManifest(db, __dirname+'/manifest.json');

// // websockets
// var sock = shoe(function(stream) {
//   stream.pipe(multilevel.server(db)).pipe(stream);
// });

// sock.install(server, '/sock');
