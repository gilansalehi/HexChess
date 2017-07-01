// App.messages = App.cable.subscriptions.create('MessagesChannel', {
//   received: function(data) {
//     // document.getElementById("messages").removeClass('hidden');
//     return document.getElementById('messages').append(this.renderMessage(data));
//   },
//
//   renderMessage: function(data) {
//     return "\n" + data.user + " : " + data.message + "\n";
//   }
// });
