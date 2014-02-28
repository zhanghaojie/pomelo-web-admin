

Template.login.events({
	"submit #loginForm": function(event) {
		event.preventDefault();
		Meteor.loginWithPassword(event.target.user.value, event.target.password.value, function() {

		});
	}
});

