
Meteor.startup(function() {
	var user = Meteor.users.findOne({username: "admin"});
	if (!user) {
		Accounts.createUser({
			username: "admin",
			password: "admin"
		})
		Accounts.createUser({
			username: "edword",
			password: "edword"
		})
	}
})


WebApp.connectHandlers.use("/callback", function(req, res, next) {
	console.log(req.query);
	//next();
	res.end();
});