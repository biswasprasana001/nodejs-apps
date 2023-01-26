// this runs when page loads
window.onload = function () {
  // empty array initialised to store messages
  var messages = [];
  // connected to websocket server running on 3700
  var socket = io.connect("http://localhost:3700");
  // storing references to DOM elements in variables
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");
  var name = document.getElementById("name");

  // event listener for incoming messages from server
  // and pushes them to message array
  socket.on("message", function (data) {
    if (data.message) {
      messages.push(data);
      var html = "";
      for (var i = 0; i < messages.length; i++) {
        html +=
          "<b>" +
          (messages[i].username ? messages[i].username : "Server") +
          ": </b>";
        html += messages[i].message + "<br />";
      }
      content.innerHTML = html;
      content.scrollTop = content.scrollHeight;
    } else {
      console.log("There is a problem:", data);
    }
  });

  // click event for sending message & username to server
  sendButton.onclick = function () {
    if (name.value == "") {
      alert("Please type your name!");
    } else {
      var text = field.value;
      socket.emit("send", { message: text, username: name.value });
      field.value = "";
    }
  };

  // captures keypress event
  field.addEventListener("keypress", function (e) {
    //  captures keycode for the pressed key
    var key = e.which || e.keyCode;
    // if key === 13, meaning ENTER Key then send message
    if (key === 13) {
      sendButton.onclick();
    }
  });
};
