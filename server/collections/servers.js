
serverCollection = new Meteor.Collection("servers");

Meteor.publish("servers", function() {
   if (this.userId) {
      return serverCollection.find();
   }

})
