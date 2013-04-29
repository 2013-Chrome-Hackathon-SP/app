var SpeechRecognition = function() {
  if ( 'webkitSpeechRecognition' in window ) {
    this.recognition = new webkitSpeechRecognition();

    this.recognition.isRecording = false;
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'pt-BR';

    this.recognition.onstart = function(evt) {
      this.isRecording = true;
      console.log("Starting Recording");
    };

    this.recognition.onresult = function(evt) {
      var recordedText = "";

      for (var i = event.resultIndex; i < event.results.length; i += 1) {
        recordedText += event.results[i][0].transcript;
      }
      // Badun Tzz Lazy <3
      document.getElementById("speeched-text").value = recordedText;
    };

    this.recognition.onerror = function(evt) {
      console.log("Error");
    };

    this.recognition.onend = function(evt) {
      console.log("End Recording");
      this.isRecording = false;
      recognition.stop();
    };
  }
};