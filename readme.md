# little dashboard

Dashboard UI made with `virtual-dom`.


## install

    $ npm install little-dashboard


## example

In the browser:

```js
var dashboard = require('../');
var schema = require('./schema.js');
var rootEl = document.getElementById('content');

dashboard(rootEl, schema);
```



schema.js

```js
module.exports = [
  {
    itemName: 'video',
    itemNamePlural: 'videos',
    fields: {
      title: 'string',
      url: 'string',
      author: 'string',
      date: 'date'
    }
  },
  {
    itemName: 'article',
    itemNamePlural: 'articles',
    fields: {
      title: 'string',
      author: 'string',
      date: 'date'
    }
  },
  {
    itemName: 'photo',
    itemNamePlural: 'photos',
    fields: {
      title: 'string',
      author: 'string',
      date: 'date'
    }
  }
];
```



Serve the same bundle at all endpoints on the server, create a websocket and a multilevel manifest:

```js
var ecstatic = require('ecstatic')({root: __dirname + '/public'});
var http = require('http');
var fs = require('fs');
var router = require('routes')();
var shoe = require('shoe');
var multilevel = require('multilevel');

var db = require('./data/db.js')();
var schema = require('./example/schema.js');
var createRoutes = require('./lib/create-routes.js');

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
```


## develop

Start a server at `localhost:8000` and watch files for changes

    $ npm install
    $ npm run dev



