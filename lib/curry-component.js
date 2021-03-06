module.exports = function curryPage(component, args) {
  var page = component.bind(component, args);
  Object.keys(component).forEach(function(k) {
    page[k] = component[k];
  });
  return page;
};
