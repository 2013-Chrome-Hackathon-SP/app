;(function(c, w, d, u) {

  "use strict";

  var button = d.getElementById("start-speech");

  if ( 'webkitSpeechRecognition' in window ) {
    console.log(window.webkitSpeechRecognition);
    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function(evt) {
      console.log("Starting", evt);
    };

    recognition.onresult = function(evt) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          interim_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      console.log(interim_transcript);
      // final_transcript = capitalize(final_transcript);
      // final_span.innerHTML = linebreak(final_transcript);
      // interim_span.innerHTML = linebreak(interim_transcript);
    };

    recognition.onerror = function(evt) {
      console.log(evt)
    };

    recognition.onend = function(evt) {
      console.log(evt);
    };

    recognition.start();

    // button.addEventListener("click", function(ev) {
    //   ev.preventDefault();
    //   recognition.start();
    // }, false);

  }

}(chrome, window, document, undefined));