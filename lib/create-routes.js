module.exports = function(item) {
  return [
    '/'+item.itemNamePlural,
    '/'+item.itemNamePlural+'/new',
    '/'+item.itemNamePlural+'/:id'
  ];
};
