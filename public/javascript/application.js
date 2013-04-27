;(function(c, w, d, u) {

  "use strict";

  var button = d.getElementById("start-speech")
  , todoList = d.getElementById("todo-list");

  if ( 'webkitSpeechRecognition' in window ) {
    var recognition = new webkitSpeechRecognition();

    // recognition.continuous = false;
    // recognition.interimResults = false;
    recognition.lang = 'pt-BR';

    recognition.onstart = function(evt) {
      console.log("Starting Record");
    };

    recognition.onresult = function(evt) {
      var recordedText = ""
      , liTemplate = "";

      for (var i = event.resultIndex; i < event.results.length; i += 1) {
        recordedText += event.results[i][0].transcript;
      }

      liTemplate = "<li class='todo-list-item'>" + recordedText + "<li>";
      todoList.insertAdjacentHTML("afterbegin", liTemplate);

      console.log(recordedText);
    };

    recognition.onerror = function(evt) {
      console.log("Error");
    };

    recognition.onend = function(evt) {
      console.log("End Record", evt);
      recognition.stop();
    };

    button.addEventListener("click", function(ev) {
      ev.preventDefault();
      recognition.start();
    }, false);

  }

}(chrome, window, document, undefined));