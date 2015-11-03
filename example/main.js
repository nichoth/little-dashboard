var dashboard = require('../');

dashboard(document.getElementById('content'), {
  schema: require('./schema.js')
});

