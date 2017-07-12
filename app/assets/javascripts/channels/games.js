//= require cable
//= require_self
//= require_tree .

this.App = {};

App.cable = ActionCable.createConsumer();

App.games = App.cable.subscriptions.create('GamesChannel', {
  received: function(data) {
    console.log('yup yup yup');
    return data;
  },
});
