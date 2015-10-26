var onAction = require('./event-bus.js').onAction;
var db = require('multilevel').client( require('../data/manifest.json') );

var createKey = require('./create-key.js');


onAction(function(action) {

  console.log(action);

  if (action.type === 'deleteVideo') {
    db.del(action.index);
    return;
  }

  if (action.type === 'createVideo') {
    var key = action.key || createKey('video', action.data);
    db.put( key, { data: action.data } );
    return;
  }
});

