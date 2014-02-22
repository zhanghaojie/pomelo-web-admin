/**
 * Created by zhanghaojie on 14-2-19.
 */

var serverCollection = new Meteor.Collection("server");
var systemInfoCollection = new Meteor.Collection("systemInfo");
var nodeInfoCollection = new Meteor.Collection("nodeInfo");

var client = new PomeloAdminClient(pomeloConfig);

client.configureModules(modulesConfig);

function pullData() {
	client.watchServer.getServers(function(err, result) {
		//console.log(result);
		//serverCollection.upsert()
	})

	client.systemInfo.getSystemInfo(function(err, result) {
		//console.log(result)
		if (result) {
			systemInfoCollection.insert(result);
		}
	})
	client.nodeInfo.getNodeInfo(function(err, result) {
		//console.log(result)
		if (result) {
			nodeInfoCollection.insert(result);
		}
	})
}

Meteor.startup(function() {
	client.connect("myid", "127.0.0.1", 3005, function(err) {
		if (!err) {
			Meteor.setInterval(function() {
				pullData();
			}, 1000);
		} else {
			console.log(err);
			console.log("login failed");
		}
	})
})

Meteor.methods({
	getServers: function() {
		if (Meteor.userId()) {
			var getServers = Meteor._wrapAsync(client.watchServer.getServers);
			return getServers.call(client.watchServer);
		}
		throw new Meteor.Error(503, "Not login");
	}
})
