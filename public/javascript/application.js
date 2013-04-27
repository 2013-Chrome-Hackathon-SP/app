;(function(c, w, d, u) {

  "use strict";

  var localStorage = c.storage
  , btnStartSpeech = d.getElementById("start-speech")
  , btnSave = d.getElementById("save-note")
  , textarea = d.getElementById("speeched-text");

  if ( 'webkitSpeechRecognition' in w ) {
    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'pt-BR';

    recognition.onstart = function(evt) {
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
      btnStartSpeech.className = "icon-speech button-speech";
      recognition.stop();
    };

    btnStartSpeech.addEventListener("click", function(ev) {
      var el = this;
      el.className = "icon-spin spin-animate button-speech";
      recognition.start();
      ev.preventDefault();
    }, false);

    btnSave.addEventListener("click", function(ev) {
      // textarea.value - variável que contém o texto do usuário
      ev.preventDefault();
    });

  }

}(chrome, window, document, undefined));