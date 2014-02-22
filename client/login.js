

Template.login.events({
	"submit #loginForm": function(event) {
		event.preventDefault();
		Meteor.loginWithPassword(event.target.user.value, event.target.password.value, function() {
			$("body").html(Meteor.render(Template.index));
		});
	}
});

// for debug  auto login
Meteor.startup(function() {
	Meteor.loginWithPassword("admin", "admin", function() {
		$("body").html(Meteor.render(Template.index));
	});
})