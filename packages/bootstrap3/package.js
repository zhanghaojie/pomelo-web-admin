Package.describe({
   summary: "Bootstrap version 3"
})


Package.on_use(function(api) {
	api.add_files(["js/bootstrap.js", "css/bootstrap.css", "css/bootstrap-theme.css"], "client");
	api.add_files(["fonts/glyphicons-halflings-regular.ttf",
						"fonts/glyphicons-halflings-regular.eot",
						"fonts/glyphicons-halflings-regular.svg",
						"fonts/glyphicons-halflings-regular.woff"], "client");
})