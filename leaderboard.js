PlayersList = new Mongo.Collection('players');
console.log('hello world');

if (Meteor.isClient){
  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find()
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
    }

  });


  Template.leaderboard.events({

    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },

    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
}

  });
};

if (Meteor.isServer) {

};