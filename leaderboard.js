PlayersList = new Mongo.Collection('players');



// Client helpers
if (Meteor.isClient){
  Template.leaderboard.helpers({
    player: function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({ createdBy: currentUserId },{sort: {score: -1, name: 1} })
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
   },

   'click .remove': function(){
     var selectedPlayer = Session.get('selectedPlayer');
     PlayersList.remove(selectedPlayer);
   }

  });

  Template.addPlayerForm.events({
      'submit form': function(event){
          event.preventDefault();
          var playerNamevar = event.target.playerName.value;
          var playerScore   = event.target.playerScore.value;
          var currentUserId = Meteor.userId;
          PlayersList.insert({
            name: playerNamevar,
            score: playerScore,
            createdBy: currentUserId
          });
          event.target.playerName.value = '';
          event.target.playerScore.value = '';
      }
  });
};

if (Meteor.isServer) {

};