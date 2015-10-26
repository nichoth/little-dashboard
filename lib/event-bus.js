var EventEmitter = require('events').EventEmitter;
var bus = new EventEmitter();
var emit = bus.emit.bind(bus);

var eventStuff = {
  emitAction: bus.emit.bind(bus, 'action'),
  emitChange: bus.emit.bind(bus, 'change'),
  onAction: bus.on.bind(bus, 'action'),
  onChange: bus.on.bind(bus, 'change'),
};

module.exports = eventStuff;
