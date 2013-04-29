var SaySomenthingModule = angular.module("SaySomenthing", []);

SaySomenthingModule.controller("TodoController", function($scope) {
  if ( 'webkitSpeechRecognition' in window ) {
    var inRecording = false
    , recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'pt-BR';

    recognition.onstart = function(evt) {
      inRecording = true;
      console.log("Starting Recording");
    };

    recognition.onresult = function(evt) {
      var recordedText = "";

      for (var i = event.resultIndex; i < event.results.length; i += 1) {
        recordedText += event.results[i][0].transcript;
      }

      console.log(recordedText, $scope.todoContent);
      document.getElementById("speeched-text").value = recordedText;
      // $scope.todoContent = recordedText;
      console.log($scope.todoContent);
    };

    recognition.onerror = function(evt) {
      console.log("Error");
    };

    recognition.onend = function(evt) {
      console.log("End Recording");
      inRecording = false;
      recognition.stop();
    };
  }

  $scope.items = [];

  chrome.storage.local.get(function(dataStoraged) {
    var localStoraged = Object.keys(dataStoraged).sort(function(a, b){ return a + b });

    localStoraged.forEach(function(key) {
      var obj;

      obj = {
        "id": key,
        "content": dataStoraged[key]["content"],
        "checked": dataStoraged[key]["checked"]
      };

      $scope.$apply(function($scope) {
        $scope.items.push(obj);
      });
    });
  });

  $scope.startRecord = function(event) {
    // if ( inRecording ) {
    //   inRecording = false;
    //   recognition.stop();
    //   return;
    // }
    // recognition.start();
    console.log("Start Record");
    $scope.todoContent = "Yahoo!";
  };

  $scope.remove = function(index, item) {
    $scope.items.splice(index, 1);
    chrome.storage.local.remove(item.id);
  };

  $scope.addTodo = function() {
    var hash = "" + Date.now()
    , todoContent = $scope.todoContent
    , dataToStorage = {}
    , dataToPush = {};

    dataToStorage[hash] = {
      "content": todoContent,
      "checked": false
    };

    dataToPush = {
      "id": hash,
      "content": todoContent,
      "checked": false
    };

    chrome.storage.local.set(dataToStorage);
    $scope.items.unshift(dataToPush);
    $scope.todoContent = "";
  };
});


document.getElementById("list-item").onclick = function() {
  document.getElementById("sidebar").style.display = "block";
};

document.getElementById("header-sidebar").onclick = function() {
  document.getElementById("sidebar").style.display = "none";
};

// ;(function(c, w, d, u) {

//   "use strict";

//   var localStorage = c.storage
//   , btnStartSpeech = d.getElementById("start-speech")
//   , btnSave = d.getElementById("save-note")
//   , textarea = d.getElementById("speeched-text");

//   d.getElementById("list-item").onclick = function() {
//     d.getElementById("sidebar").style.display = "block";
//   };

//   d.getElementById("header-sidebar").onclick = function() {
//     d.getElementById("sidebar").style.display = "none";
//   };

//   if ( 'webkitSpeechRecognition' in w ) {
//     var recognition = new webkitSpeechRecognition();

//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'pt-BR';

//     recognition.onstart = function(evt) {
//       console.log("Starting Record");
//     };

//     recognition.onresult = function(evt) {
//       var recordedText = "";

//       for (var i = event.resultIndex; i < event.results.length; i += 1) {
//         recordedText += event.results[i][0].transcript;
//       }

//       textarea.value = recordedText;

//       console.log(recordedText);
//     };

//     recognition.onerror = function(evt) {
//       console.log("Error");
//     };

//     recognition.onend = function(evt) {
//       console.log("End Record", evt);
//       btnStartSpeech.className = "icon-speech button-speech";
//       recognition.stop();
//     };

//     btnStartSpeech.addEventListener("click", function(ev) {
//       var el = this;
//       el.className = "icon-speech button-speech recording";
//       recognition.start();
//       ev.preventDefault();
//     }, false);

//     btnSave.addEventListener("click", function(ev) {
//       textarea.value = "";
//       ev.preventDefault();
//     });

//   }

// }(chrome, window, document, undefined));