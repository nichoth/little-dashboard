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

    createVideo: function(newData) {
      create('video', newData);
    },

    createPhoto: function(newData) {
      create('photo', newData);
    },

    createArticle: function(newData) {
      create('article', newData);
    },

    del: function(index) {
      db.del(index);
    },

    create: create
  };

  function create(domain, newData) {
    var key = createKey(domain, newData);
    db.put( key, { data: newData } );
  }
};
