var FormField = require('vdom-components/Form/FormField');
var FileUpload = require('vdom-components/Form/FileUpload');
var curry = require('../lib/curry-component.js');

module.exports = [
  {
    itemName: 'video',
    itemNamePlural: 'videos',
    fields: {
      title: curry(FormField, {
        field: 'Title'
      }),
      thumbnail: curry(FileUpload, {
        label: 'Thumbnail'
      }),
      url: curry(FormField, {
        field: 'Url'
      })
    }
  },
  // {
  //   itemName: 'article',
  //   itemNamePlural: 'articles',
  //   fields: {
  //     title: 'string',
  //     author: 'string',
  //     date: 'date'
  //   }
  // },
  // {
  //   itemName: 'photo',
  //   itemNamePlural: 'photos',
  //   fields: {
  //     title: 'string',
  //     author: 'string',
  //     date: 'date'
  //   }
  // }
];

