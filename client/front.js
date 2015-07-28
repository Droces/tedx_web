Meteor.subscribe('categories', function onReady() {
  Session.set('categoriesLoaded', true);
});

Meteor.subscribe('config', function onReady() {
  Session.set('configLoaded', true);
});

Meteor.subscribe('chapters', function onReady() {
  Session.set('chapters', true);
});

Template.home.helpers({
  "topvideos": function() {
    var topConfig = config.findOne({"name":"top"});
    check(topConfig, Object);
    if(topConfig.tags) {
      return videos.find({"categories": {$in: topConfig.tags}});
    }
    else return videos.find({});
  }
});


Meteor.subscribe('favorites', function onReady() {
  Session.set('favoritesLoaded', true);
});

Template.basicLayout.created = function() {
 Router.configure({
   progressSpinner: false
 });
}

Template.basicLayout.helpers({
  searching: function() {
    if(Session.get("searching")) {
      return true;
    }
    else return false;
  },
  feedbacking: function() {
    if(Session.get("feedbacking")) {
      return true;
    }
    else return false;
  },
  addingvideo: function() {
    if(Session.get("addingvideo")) {
      return true;
    }
    else return false;
  },
});

Handlebars.registerHelper('isEqual', function(string1, string2) {
    return string1 === string2;
});

Handlebars.registerHelper('userIsInRole', function(role){
  return userIsInRole(role);
});

Handlebars.registerHelper('userIsVerified', function(role){
 return userIsVerified();
});

Handlebars.registerHelper('formatId', function(data) {
    return (data && data._str) || data;
});

formattedId = function(data) {
  return (data && data._str) || data;
}

Handlebars.registerHelper('objectsWithIndex', function(objects) {
  // check(objects, Array);
  for(var i = 0; i<objects.length; i++) {
      objects[i].index = i;
  }
  return objects;
});
