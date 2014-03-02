
Meteor.subscribe("servers");

serverCollection = new Meteor.Collection("servers");

Template.servers.servers = function() {
   return serverCollection.find({});
}
