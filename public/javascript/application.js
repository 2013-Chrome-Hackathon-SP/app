var SaySomenthingModule = angular.module("SaySomenthing", []);

SaySomenthingModule.controller("TodoController", function($scope) {
  var SPEECH = new SpeechRecognition();

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
    if ( SPEECH.recognition.isRecording ) {
      SPEECH.recognition.isRecording = false;
      SPEECH.recognition.stop();
      return;
    }
    SPEECH.recognition.start();
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