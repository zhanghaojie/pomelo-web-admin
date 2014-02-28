/**
 * Created by zhanghaojie on 14-2-19.
 */

var serverCollection = new Meteor.Collection("servers");
var systemInfoCollection = new Meteor.Collection("systemInfo");
var nodeInfoCollection = new Meteor.Collection("nodeInfo");

var client = new PomeloAdminClient(pomeloConfig);

client.on("error", function() {

})

console.log(client.configureModules);
client.configureModules(modulesConfig);

function pullData() {
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
			//get all servers
			client.watchServer.getServers(function(err, result) {
				var record = serverCollection.findOne();
				if (record) {
					serverCollection.update({_id: record._id}, result.msg, function(err, result) {

					})
				}
				else {
					serverCollection.insert(result.msg, function(err, result) {
						console.log();
					});
				}
			})

			Meteor.setInterval(function() {
				//pullData();
			}, 1000);

		} else {
			console.log("login failed");
		}
	})

	client.on("events", function() {
		console.log(arguments);
	})
 
})

