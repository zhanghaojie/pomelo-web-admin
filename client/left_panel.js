
Template.leftPanel.rendered = function() {
	UI.DomRange.insert(UI.render(Template.servers).dom, $("#main_panel").get(0));
}

Template.leftPanel.user = function(){
	return Meteor.user();
}


Template.leftPanel.events({
	"click a" : function(event) {
		event.preventDefault();
	}
})
