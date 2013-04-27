;(function(c, w, d, u) {

  "use strict";

  var localStorage = chrome.storage.local
  , recognized = false
  , button = d.getElementById("start-speech")
  , textarea = d.getElementById("speeched-text");

  if ( 'webkitSpeechRecognition' in w ) {
    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'pt-BR';

    recognition.onstart = function(evt) {
      recognized = true;
      console.log("Starting Record");
    };

    recognition.onresult = function(evt) {
      var recordedText = "";

      for (var i = event.resultIndex; i < event.results.length; i += 1) {
        recordedText += event.results[i][0].transcript;
      }

      textarea.value = recordedText;

      console.log(recordedText);
    };

    recognition.onerror = function(evt) {
      console.log("Error");
    };

    recognition.onend = function(evt) {
      console.log("End Record", evt);
      recognized = false;
      recognition.stop();
    };

    button.addEventListener("click", function(ev) {
      if ( recognized ) {
        recognition.stop();
        return;
      }
      ev.preventDefault();
      recognition.start();
    }, false);

  }

}(chrome, window, document, undefined));