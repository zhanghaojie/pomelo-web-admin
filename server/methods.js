

Meteor.methods({
	getServers: function() {
		if (Meteor.userId()) {
			var getServers = Meteor._wrapAsync(client.watchServer.getServers);
			return getServers.call(client.watchServer);
		}
		throw new Meteor.Error(503, "Not login");
	}
})
