import Ember from 'ember';
var compile = Ember.Handlebars.compile;

function generateContent(n) {
  var content = Ember.A();
  for (var i = 0; i < n; i++) {
    content.push({name: "Item " + (i+1)});
  }
  return content;
}

function extractPosition(element) {
  return element.getBoundingClientRect();
}

function sortElementsByPosition (elements) {
  return elements.sort(function(a, b){
    return sortByPosition(extractPosition(a), extractPosition(b));
  });
}

function sortByPosition(a, b) {
  if (b.top === a.top){
    return (a.left - b.left);
  }
  return (a.top - b.top);
}

function itemPositions(view) {
  return Ember.A(view.$('.ember-list-item').toArray()).map(function(e) {
    return extractPosition(e);
  }).sort(sortByPosition);
}

export {
  itemPositions,
  generateContent,
  sortElementsByPosition,
  extractPosition,
  compile };
