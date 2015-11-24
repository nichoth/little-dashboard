var FormField = require('vdom-components/Form/FormField');
var FileUpload = require('vdom-components/Form/FileUpload');
var ImageUpload = require('vdom-components/Form/ImageUpload');
var curry = require('vdom-components/lib/curry-component');

var fields = {
  title: {
    args: {
      field: 'Title'
    },
    component: FormField
  },
  thumbnail: {
    args: {
      field: 'Thumbnail'
    },
    component: curry(ImageUpload, {
      deleteButton: require('../lib/components/button-delete')
    })
  },
  url: {
    args: {
      field: 'Url',
      isValid: function(value){ return !!value; }
    },
    component: FormField
  }
};


module.exports = [
  {
    itemName: 'video',
    itemNamePlural: 'videos',
    fields: fields
  },
  {
    itemName: 'article',
    itemNamePlural: 'articles',
    fields: fields
  },
  {
    itemName: 'photo',
    itemNamePlural: 'photos',
    fields: fields
  }
];
