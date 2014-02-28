

Template.index.isLogin = function() {
	return !!Meteor.userId()
}

// for debug  auto login
Meteor.startup(function() {
	//Meteor.loginWithPassword("admin", "admin", function() {
		//$("body").html(Meteor.render(Template.index));
		//UI.body.insert(UI.render(Template.servers).dom);
		//UI.body.contentParts.pop();
		//UI.DomRange.insert(UI.render(Template.index).dom, document.body);
	//});
})