var s = require('slug');
var shasum = require('shasum');
var reduce = require('lodash.reduce');
var extend = require('xtend');
var map = require('lodash.map');

var slugify = function(str) {
  return s(str, '_');
};

function createKey(domain, data) {
  var str = domain + (data.title || '') + Date.now();
  return slugify(str);
}

// adapter for a level db
module.exports = function(db) {

  function createWithAttachment(key, data, files) {

    var fs = reduce(files, function(acc, buffer, k) {
      acc[k] = {
        hash: shasum(buffer),
        value: buffer
      };
      return acc;
    }, {});

    // put the attachments
    var ops = map(fs, function(f) {
      return {
        type: 'put',
        key: f.hash,
        value: f.value,
        valueEncoding: 'binary'
      };
    });

    // put the main thing
    ops.push({
      type: 'put',
      key: key,
      value: {
        data: data,
        attachments: map(fs, function(f) {
          return f.hash;
        })
      }
    });

    console.log(ops);
    db.batch(ops);
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

      console.log('save a thing', newData);

      // attachment
      if (newData.attachments) {
        createWithAttachment(key, newData.data, newData.attachments);
        return;
      }

      // no attachment
      db.put( key, newData );
    }

  };
};
