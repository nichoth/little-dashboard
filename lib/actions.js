var createKey = require('./create-key.js');

module.exports = function(db) {

  return {

    delVideo: function(index) {
      db.del( index );
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
