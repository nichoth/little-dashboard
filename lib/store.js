var EventEmitter = require('events').EventEmitter;
var util = require('util');

util.inherits(Store, EventEmitter);

module.exports = Store;

function Store() {
  if ( !(this instanceof Store) ) return new Store();

  var self = this;
  setTimeout(function() {
    self.emit('change');
  }, 1000);
}

Store.prototype.fetch = function(cb) {
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
  cb(data);
};
