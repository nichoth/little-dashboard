var EventEmitter = require('events').EventEmitter;
var bus = new EventEmitter();
var emit = bus.emit.bind(bus);
var shoe = require('shoe');
var db = require('multilevel').client( require('../data/manifest.json') );

var obj = {
  bus: bus,
  emitAction: bus.emit.bind(bus, 'action'),
  emitChange: bus.emit.bind(bus, 'change'),
  onAction: bus.on.bind(bus, 'action'),
  onChange: bus.on.bind(bus, 'change'),
  actions: {
    del: function(index) {
      obj.emitAction({type: 'delete', index: index});
    }
  },
  videos: db.liveStream({min: 'video', max: 'video~'})
};

bus.on('action', function(action) {
  if (action.type === 'delete') {
    db.del(action.index);
  }
});

module.exports = obj;

// var stream = wsock('ws://' + location.host);
// // stream.on('data', console.log.bind(console));
// stream.pipe( db.createRpcStream() ).pipe(stream);

var sock = shoe('/sock');
sock.pipe( db.createRpcStream() ).pipe(sock);

db.liveStream().on('data', console.log.bind(console));
window.db = db;
