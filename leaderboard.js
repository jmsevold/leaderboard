PlayersList = new Mongo.Collection('players');
console.log('hello world');

if (Meteor.isClient){
  Template.leaderboard.helpers({
    player: function(){
      return PlayersList.find()
    },

    otherFunction: function(){
      return 'other function'
    }
  });
};

if (Meteor.isServer) {

};