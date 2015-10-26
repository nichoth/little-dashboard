var shoe = require('shoe');
var db = require('multilevel').client( require('../data/manifest.json') );

var sock = shoe('/sock');
sock.pipe( db.createRpcStream() ).pipe(sock);

db.liveStream().on('data', console.log.bind(console));
window.db = db;


module.exports = {
  db: db,
  videos: db.liveStream({min: 'video', max: 'video~'}),
  articles: db.liveStream({min: 'article', max: 'article~'}),
  photos: db.liveStream({min: 'photo', max: 'photo~'})
};
