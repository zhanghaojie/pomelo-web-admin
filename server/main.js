
Meteor.startup(function() {
	var user = Meteor.users.findOne({username: "admin"});
	if (!user) {
		Accounts.createUser({
			username: "admin",
			password: "admin"
		})
	}
})
