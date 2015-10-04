var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var fs = require('fs');
var router = require('routes')();

router.addRoute('/api/:name', function(req, res, params) {
  res.setHeader("Content-Type", "text/html");
  res.end('you requested ' + params.name);
});

function appRoute(req, res) {
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream('public/index.html')
    .pipe(res);
}

// spa routes
router.addRoute('/videos', appRoute);
router.addRoute('/articles', appRoute);
router.addRoute('/photos', appRoute);


http.createServer(function(req, res) {

  var m = router.match(req.url);
  if (m) {
    m.fn(req, res, m.params);
  }
  else {
    ecstatic(req, res);
  }

}).listen(8000);
console.log('listening on :8000');
