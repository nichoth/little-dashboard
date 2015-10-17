var EventEmitter = require('events').EventEmitter;
var util = require('util');

var bus = require('./event-bus.js');

util.inherits(Store, EventEmitter);

var data = {
  0: {
    data: {
      index: 0,
      title: 'Fabulous Pores',
    },
    metadata: [
      {
        field: 'author',
        value: 'Some Author'
      },
      {
        field: 'date',
        value: 'some date'
      }
    ]
  }
};

module.exports = Store;

function Store() {
  if ( !(this instanceof Store) ) return new Store();

  var self = this;

  bus.on('video-create', function(d) {
    data[1] = {
      data: {
        index: 1,
        title: d.title
      }
    };
    self.emit('change');
  });

  setTimeout(function() {
    self.emit('change');
  }, 1000);
}

Store.prototype.fetch = function(cb) {
  cb(data);
};
