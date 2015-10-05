module.exports = Store;

function Store(bus) {
  if (!(this instanceof Store)) return new Store(bus);
}

Store.prototype.fetch = function(domain, cb) {

  process.nextTick(function() {
    var testVideo = {
      _name: 'example video',
      metadata: [
        { field: 'date', value: 'some date' },
        { field: 'author', value: 'mister person' }
      ]
    };

    cb(null, [testVideo]);
  });
};
