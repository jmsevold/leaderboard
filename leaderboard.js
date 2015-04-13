PlayersList = new Mongo.Collection('players');
console.log('hello world');


// Client helpers
if (Meteor.isClient){
  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find({},{sort: {score: -1, name: 1} })
    },

    otherFunction: function(){
      return 'other function'
    },

    selectedClass: function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return 'selected'
      }
    },

    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
    }
  });



// Client Events
  Template.leaderboard.events({

    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },

    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },

   'click .decrement': function(){
     var selectedPlayer = Session.get('selectedPlayer');
     PlayersList.update(selectedPlayer, {$inc: {score: -5} });
   } 

  });

  Template.addPlayerForm.events({
      'submit form': function(event){
          event.preventDefault();
          console.log("Form submitted");
          console.log(event.type);
      }
  });
};

if (Meteor.isServer) {

};