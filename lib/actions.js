var createKey = require('./create-key.js');

module.exports = function(db) {

  return {

    delVideo: function(index) {
      db.del( index );
    },

    fetch: function(index, cb) {
      db.get(index, cb);
    },

    updateItem: function(index, newData) {
      db.batch([
        { type: 'del', key: index },
        { type: 'put', key: index, value: { data: newData } }
      ], console.log.bind(console, 'update complete '));
    },

    del: function(index) {
      db.del(index);
    },

    create: function (domain, newData) {
      var key = createKey(domain, newData);
      db.put( key, { data: newData } );
    }

  };
};
