/**
 * Created by zhanghaojie on 14-2-19.
 */

var serverCollection = new Meteor.Collection("server");
var systemInfoCollection = new Meteor.Collection("systemInfo");

var client = new PomeloAdminClient(pomeloConfig);

client.configureModules(modulesConfig);

function pullData() {
	client.systemInfo.getSystemInfo(function(err, result) {
		console.log(result)

	})
}

Meteor.startup(function() {
	client.connect("myid", "127.0.0.1", 3005, function(err) {
		if (!err) {

		} else {
			console.log(err);
			console.log("login failed");
		}
	})
	Meteor.setInterval(function(){
		pullData();
	}, 1000)
})
