var curry = require('../lib/curry-component.js');

module.exports = [
  {
    itemName: 'video',
    itemNamePlural: 'videos',
    fields: {
      title: 'string',
      thumbnail: curry( require('vdom-components/FileUpload'), {
        label: 'Thumbnail'
      }),
      url: 'string',
      author: 'string',
      date: 'date'
    }
  },
  {
    itemName: 'article',
    itemNamePlural: 'articles',
    fields: {
      title: 'string',
      author: 'string',
      date: 'date'
    }
  },
  {
    itemName: 'photo',
    itemNamePlural: 'photos',
    fields: {
      title: 'string',
      author: 'string',
      date: 'date'
    }
  }
];

