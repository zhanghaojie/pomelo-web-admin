/**
 * Created by zhanghaojie on 14-2-19.
 */

var client = new PomeloAdminClient(pomeloConfig);

client.on("error", function() {

})

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
			getAllServers(function() {
            console.log("get all servers")
         })

			Meteor.setInterval(function() {
				//pullData();
			}, 1000);

		} else {
			console.log("login failed");
		}
	})

	client.on("events", function() {
		//console.log(arguments);
	})
})


var getAllServers = function(cb) {
   client.watchServer.getServers(function(err, result) {
      var records = result.msg;
      for(var key in records) {
         var record = records[key];
         serverCollection.upsert({serverId: key}, record);
      }
   })
}
