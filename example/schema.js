var FormField = require('vdom-components/Form/FormField');
var FileUpload = require('vdom-components/Form/FileUpload');
var curry = require('../lib/curry-component.js');

module.exports = [
  {
    itemName: 'video',
    itemNamePlural: 'videos',
    fields: {
      title: {
        args: {
          field: 'Title'
        },
        component: FormField
      },
      thumbnail: {
        args: {
          label: 'Thumbnail'
        },
        component: FileUpload
      },
      url: {
        args: {
          field: 'Url'
        },
        component: FormField
      }
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

