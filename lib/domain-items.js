// trying this

var domainItems = [
  { namePlural: 'videos', name: 'video' },
  { namePlural: 'photos', name: 'photo' },
  { namePlural: 'articles', name: 'article' }
];

var map = domainItems.reduce(function(acc, item){
  acc['/'+item.namePlural] = curryPage(DomainPage, {
    stream: streams[item.namePlural],
    itemName: item.name,
    itemNamePlural: item.namePlural
  });
  acc['/'+item.namePlural+'/new'] = curryPage(CreatePage, {
    itemNamePlural: item.namePlural,
  });
  return acc;
}, {});
