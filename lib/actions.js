var s = require('slug');
var shasum = require('shasum');
var reduce = require('lodash.reduce');
var forEach = require('lodash.foreach');
var extend = require('xtend');
var map = require('lodash.map');
var after = require('after');

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
        attachments: reduce(fs, function(acc, f, k) {
          acc[k] = f.hash;
          return acc;
        }, {})
      }
    });

    db.batch(ops);
  }

  var actions = {

    delVideo: function(index) {
      db.del( index );
    },

    fetch: function(index, cb) {
      db.get(index, function(err, item) {
        var opts = {
          valueEncoding: 'binary'
        };

        var next = after( Object.keys(item.attachments || {}).length, done );
        forEach(item.attachments, function(hash, k) {
          db.get(hash, opts, function(err, img) {
            item.attachments[k] = img;
            next(err, item);
          });
        });

        function done(err, res) {
          cb(err, item);
        }
      });
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

  return actions;
};
