var createKey = require('./create-key.js');
var shasum = require('shasum');
var reduce = require('lodash.reduce');
var extend = require('xtend');

module.exports = function(db) {

  function createWithAttachment(key, data, file) {
    var s = shasum(file);
    db.batch([
      { type: 'put', key: key, value: { data: extend(data, {file: s}) } },
      { type: 'put', key: s, value: file, valueEncoding: 'binary' },
    ]);
  }

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

      // attachment
      if (newData.attachments) {
        var d = newData.data;
        return createWithAttachment(key, d, newData.attachments.thumbnail);
      }

      // no attachment
      db.put( key, newData );
    }

  };
};
