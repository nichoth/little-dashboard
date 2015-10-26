var createKey = require('./create-key.js');

module.exports = function(db) {

  return {

    delVideo: function(index) {
      db.del( index );
    },

    createVideo: function(newData) {
      var key = createKey('video', newData);
      db.put( key, { data: newData } );
      return;
    },

    del: function(index) {
      db.del(index);
    },

    create: function(domain, newData) {
      var key = createKey(domain, newData);
      db.put( key, { data: newData } );
      return;
    }

  };
};
