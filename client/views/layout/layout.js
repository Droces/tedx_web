Template.singlePage.events({
	'click .logo': function() {
		window.open("http://www.tedxcapetown.org","_self");
	}
});

Template.adminMenu.helpers({
	'votes': function() {
		return 3 - votes.find({"user":Meteor.userId()}).count();
	},
	'taskRemaining': function() {
		if(votes.find({"user":Meteor.userId()}).count()==3) return false;
		return true;
	}
})

Template.adminMenu.events({
	'click .menuToggle': function(event, template) {
		var dropDown = template.$(".dropDown");
		if(dropDown.hasClass("active")) {
			template.$(".dropDownArrow").removeClass("active");
			dropDown.removeClass("active");
		}
		else {
			dropDown.addClass("active");
			template.$(".dropDownArrow").addClass("active");
		}
	},
	'click .voteLink': function() {
		Router.go("manage.speakers");
	},
	'click .logout': function(event, template) {
		Meteor.logout();
	},
	'click .resendVerificationEmail': function(event, template) {
		Meteor.call('resendVerificationEmail', function (error, result) {
			if(error) FlashMessages.sendError("There was an error sending the verfication message.");
			else FlashMessages.sendSuccess("Great! Sending... Check your email.");
		} );
	}
});

Template.default.helpers({
	"color": function() {
		return "red";
	},
});

Template.default.events({
	'click .mobile-menu-toggle': function() {
		$(".nav-links").toggleClass("visible-mobile");
	}
})