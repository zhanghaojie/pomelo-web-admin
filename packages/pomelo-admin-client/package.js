
Package.describe({
	summary: "pomelo admin client"
})

Npm.depends({"socket.io-client": "0.9.16"});

Package.on_use(function(api) {
	api.add_files(["protocol.js", "pomelo_admin_client.js", "md5.js"], "server");
	api.export("PomeloAdminClient", "server");
})