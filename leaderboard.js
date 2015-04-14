PlayersList = new Mongo.Collection('players');



// Client helpers
if (Meteor.isClient){

  Meteor.subscribe('thePlayers');

  Template.leaderboard.helpers({
    player: function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({}, {sort: {score: -1, name: 1}})
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
     Meteor.call('removePlayerData',selectedPlayer);
   }

  });

  Template.addPlayerForm.events({
      'submit form': function(event){
          event.preventDefault();
          var playerNamevar = event.target.playerName.value;
          var playerScore   = event.target.playerScore.value;
        
          event.target.playerName.value = '';
          event.target.playerScore.value = '';
          Meteor.call('insertPlayerData',playerNamevar);
      }
  });
};

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId})
  });
  

  Meteor.methods({
    'insertPlayerData': function(playerNamevar){
        var currentUserId = Meteor.userId();
        PlayersList.insert({
          name: playerNamevar,
          score: 0,
          createdBy: currentUserId
        });
    },

    'removePlayerData': function(selectedPlayer){
      PlayersList.remove(selectedPlayer);
    }
  });
};